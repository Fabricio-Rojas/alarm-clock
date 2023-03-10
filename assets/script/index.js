'use strict';

// Declaring Elements
const clock = document.querySelector('h1');
const alarmTime = document.querySelector('span');
const timeInp = document.querySelector('#time');
const alarmBtn = document.querySelector('#set-alarm');

const alarmSound = new Audio('./assets/audio/AlarmClock.mp3');
alarmSound.type = 'audio/mp3';
alarmSound.volume = 0.15;

// Time Update function
function updateTime() {
    let now = new Date();
    let hour = now.getHours().toString().padStart(2, '0');
    let minute = now.getMinutes().toString().padStart(2, '0');
    let second = now.getSeconds().toString().padStart(2, '0');
    
    clock.innerText = `${hour}:${minute}:${second}`;

    // if statement
    if (`${hour}:${minute}` == alarmTime.innerText) {
        clock.style.color = 'rgb(53, 168, 114)';
        alarmSound.play();
    } else {
        clock.style.color = '#fff';
    };
};

setInterval(updateTime, 1000);

// Time Inp Validation
timeInp.addEventListener('keyup', function() {
    const validInp = /[^0-9:]/g;

    if (validInp.test(this.value)) {
        this.value = this.value.replace(validInp, '');
    };
});

// Ser Alarm Function
alarmBtn.addEventListener('click', function() {
    const validTime = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
    const currentTime = clock.innerText.slice(0, -3);

    if (timeInp.value == currentTime) {
        alarmTime.innerText = "Alarm can't be set to current time";
        alarmTime.style.marginLeft = '5px'
    } else if (validTime.test(timeInp.value)) {
        alarmTime.innerText = timeInp.value;
        alarmTime.style.marginLeft = '5px'
    } else {
        alarmTime.innerText = 'Please input a valid 24h time';
    };
});
