import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('input[type = "text"]');
const btnStartEl = document.querySelector('button[data-start]');
const refs = {
  dataDaysEl: document.querySelector('[data-days]'),
  dataHoursEl: document.querySelector('[data-hours]'),
  dataMinutesEl: document.querySelector('[data-minutes]'),
  dataSecondsEl: document.querySelector('[data-seconds]'),
};

let selectedDate = 0;
btnStartEl.disabled = true;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const dateNow = new Date().getTime();
    selectedDate = selectedDates[0].getTime();

    if (dateNow > selectedDate) {
      return Notiflix.Notify.failure('Please choose a date in the future');
    }
    btnStartEl.disabled = false;
    btnStartEl.addEventListener('click', onBtnStartElClick);
  },
};

const calendar = flatpickr(inputEl, options);

function onBtnStartElClick(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

  timer.start();
}

const timer = {
  intervalId: null,
  isActive: false,
  start() {
    btnStartEl.disabled = true;
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = selectedDate - currentTime;

      if (deltaTime <= 1000) {
        return clearInterval(this.intervalId);
      }
      const time = convertMs(deltaTime);
      updateTimer(time);
    }, 1000);
  },
  stop() {
    clearInterval(this.intervalId);
  },
};



function updateTimer({ days, hours, minutes, seconds }) {
  refs.dataDaysEl.textContent = `${days}`;
  refs.dataHoursEl.textContent = `${hours}`;
  refs.dataMinutesEl.textContent = `${minutes}`;
  refs.dataSecondsEl.textContent = `${seconds}`;
}

function convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  
  const days = addLeadingZero(Math.floor(ms / day));
  
  const hours = addLeadingZero(Math.floor((ms % day) / hour));

  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
 
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
