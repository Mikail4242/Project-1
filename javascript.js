let timer = null;

const timeDisplay = document.querySelector('.display_time-left');
const endTimeBreak = document.querySelector('.display_end-time');
const buttons = document.querySelectorAll('[data-time]');
const custom = document.querySelector('#custom');
const end = document.querySelector('.end-time');


 function Countdown(seconds) {
    stopTimer()

    const getNow = Date.now();
    const then = getNow + seconds * 1000;
    timeLeft(seconds);
    endTime(then);

    timer = setInterval(() =>{
    const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0){ // when it hits zero will stop it
            stopTimer();
            return;
        }

        if (secondsLeft <= 300){
            timeDisplay.classList.add('time');
        } else if (secondsLeft >= 299){
            timeDisplay.classList.remove('time');
        }

        timeLeft(secondsLeft);
        }, 1000)
 }


 function stopTimer(){
    clearInterval(timer);
 }

 
 function timeLeft(seconds){
     const minutes = Math.floor(seconds / 60);
     const remainSeconds = seconds % 60;
     const display = `${minutes}:${remainSeconds < 10 ? '0' : ''}${remainSeconds}`;
     timeDisplay.textContent = display;
 }

 function endTime(time) {
     const end = new Date(time);
     const hour = end.getHours();
     const minutes = end.getMinutes();
     endTimeBreak.textContent = `Be back at ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
 }

 function startTimer(){
     const seconds = parseInt(this.dataset.time);
     Countdown(seconds)
 }

 buttons.forEach(button => button.addEventListener('click' , startTimer));
  
 custom.addEventListener('submit' , function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    Countdown(mins * 60);
    this.reset();
 });