// Описан в документации
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
const refs = {
  picker: document.querySelector('#datetime-picker'),
  start: document.querySelector('button'),
  day: document.querySelector('span[data-days]'),
  hour: document.querySelector('span[data-hours]'),
  minute: document.querySelector('span[data-minutes]'),
  second: document.querySelector('span[data-seconds]'),
};
refs.start.disabled = true;
flatpickr(refs.picker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const startTime = Date.now();
    const scheduledTime = Number(selectedDates[0]);
    refs.start.disabled = true;
    let timerId = null;
    if (scheduledTime < startTime) {
      return Notify.warning('Please choose a date in the future');
    } else {
      refs.start.disabled = false;
    }

    refs.start.addEventListener('click', start);
    function start() {
      timerId = setInterval(() => {
        refs.start.disabled = true;
        refs.picker.disabled = true;

        const currentTime = Date.now();
        const deltaTime = scheduledTime - currentTime;
        const timeConvertMs = convertMs(deltaTime);
        console.log(timeConvertMs);
        updateTime(timeConvertMs);
        if (deltaTime <= 1000) {
          return clearInterval(timerId);
        }
      }, 1000);
    }
  },
});

function updateTime({ days, hours, minutes, seconds }) {
  refs.day.textContent = `${days}`;
  refs.hour.textContent = `${hours}`;
  refs.minute.textContent = `${minutes}`;
  refs.second.textContent = `${seconds}`;
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
