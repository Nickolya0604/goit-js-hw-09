import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputRef = document.querySelector('#datetime-picker');
const btnRef = document.querySelector('[type="button"]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

btnRef.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const randerTime = () => {
      const time = selectedDates[0].getTime() - Date.now();

      if (time > 0) {
        btnRef.disabled = false;
        const padNum = num => String(num).padStart(2, 0);
        daysRef.textContent = padNum(convertMs(time).days);
        hoursRef.textContent = padNum(convertMs(time).hours);
        minutesRef.textContent = padNum(convertMs(time).minutes);
        secondsRef.textContent = padNum(convertMs(time).seconds);
      } else {
        Notiflix.Notify.failure('Please choose a date in the future');
        clearInterval(intervalId);
        return;
      }
    };
    const intervalId = setInterval(randerTime, 1000);
  },
};

flatpickr(inputRef, options);

const onStartClock = e => {
  e.preventDefault();
  let intervalId = setInterval(() => {
    const time = new Date(inputRef.value).getTime() - Date.now();
    if (time <= 0) {
      clearInterval(intervalId);
      return;
    }

    const date = convertMs(time);
    console.log(date);
  }, 1000);
};

btnRef.addEventListener('click', onStartClock);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
