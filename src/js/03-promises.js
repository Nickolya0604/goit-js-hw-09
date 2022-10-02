import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');
formRef.addEventListener('submit', onSubmitFormRef);

function onSubmitFormRef(evt) {
  evt.preventDefault();
  const form = new FormData(formRef);
  const amount = Number(form.get('amount'));
  const firstDelay = Number(form.get('delay'));
  const step = Number(form.get('step'));
  setTimeout(generatePromises, firstDelay, amount, step, firstDelay);
}

function generatePromises(amount, step, firstDelay) {
  for (let i = 0; i < amount; i += 1) {
    createPromise(i + 1, step * i)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `Fulfilled promise ${position} in ${delay + firstDelay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `Rejected promise ${position} in ${delay + firstDelay}ms`
        );
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
