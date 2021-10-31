const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timer = 0;

startBtn.addEventListener('click', onChangeBacgraundColor);
stopBtn.addEventListener('click', () => {
  clearInterval(timer);
  startBtn.disabled = false;
});
function onChangeBacgraundColor() {
  timer = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.disabled = true;
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
