import { Notify } from 'notiflix/build/notiflix-notify-aio';
const formRef = document.querySelector('form');
formRef.addEventListener('submit', e => {
  e.preventDefault();
  for (let i = 1; i <= Number(e.target.amount.value); i += 1) {
    console.log(
      Number(e.target.delay.value) + Number(e.target.step.value) * i - Number(e.target.step.value),
    );
    let a =
      Number(e.target.delay.value) + Number(e.target.step.value) * i - Number(e.target.step.value);
    setTimeout(() => {
      createPromise(i, Number(e.target.step.value))
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
          Notify.success(`✅ Fulfilled promise ${position} in ${delay * position}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
          Notify.failure(`❌ Rejected promise ${position} in ${delay * position}ms`);
        });
    }, a);
  }
});
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return Promise.resolve({ position, delay });
  } else {
    return Promise.reject({ position, delay });
  }
}
// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//     Notify.success(`✅ Fulfilled promise ${position} in ${delay * position}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });

// // Fulfilled promise
// new Promise(resolve => resolve('success value')).then(value => console.log(value));

// Promise.resolve('success value').then(value => console.log(value));

// // Rejected promise
// new Promise((resolve, reject) => reject('error')).catch(error => console.error(error));

// Promise.reject('error').catch(error => console.error(error));
