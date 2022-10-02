function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const bd = document.querySelector('body');

btnStop.disabled = true;

btnStart.addEventListener('click', () => {
  timerId = setInterval(() => {
    bd.style.background = getRandomHexColor();
  }, 1000);

  btnStart.disabled = true;
  btnStop.disabled = false;
  // if (!btnStart.onclick) {
  //   btnStart.disabled = true;
  //   btnStop.disabled = false;
  // }
});

btnStop.addEventListener('click', () => {
  clearInterval(timerId);
  btnStop.disabled = true;
  btnStart.disabled = false;
  // if (!btnStop.onclick) {
  //   btnStop.disabled = true;
  //   btnStart.disabled = false;
  // }
});
