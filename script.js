const currentTime = document.querySelector('.wrapper h1')
const selectMenu = document.querySelectorAll('select')
const setAlarmBtn = document.querySelector('button')
const content = document.querySelector('.wrapper .content')

let alarmTime
let isAlarmSet = false
let ringtone = new Audio("./sound/bass boosted Among Us.mp3")


for(let i=12; i>0; i--){
    //if number is less than 10 add '0' before it
    i = i < 10 ? '0' + i : i
    let option = `<option value="${i}"> ${i} </option>`
    selectMenu[0].firstElementChild.insertAdjacentHTML('afterend', option)
}
for(let i=59; i>=0; i--){
    //if number is less than 10 add '0' before it
    i = i < 10 ? '0' + i : i
    let option = `<option value="${i}"> ${i} </option>`
    selectMenu[1].firstElementChild.insertAdjacentHTML('afterend', option)
}
for(let i=2; i>0; i--){
    //if number is less than 10 add '0' before it
    let ampm = i == 1 ? 'AM' : 'PM'
    let option = `<option value="${ampm}"> ${ampm} </option>`
    selectMenu[2].firstElementChild.insertAdjacentHTML('afterend', option)
}
//every 1000 milliseconds function calls
setInterval(() => {
    //getting hours, mins, secs
    let date = new Date()
    let h = date.getHours()
    let m = date.getMinutes()
    let s = date.getSeconds()
    ampm = 'AM'

    if(h >= 12){
        h = h - 12
        ampm = 'PM'
    }
    //if hour value is 0, set this value to 12 seconds
    h = h == 0 ? h = 12 : h
    //add 0 if digits are less than 10
    m = m < 10 ? '0' + m : m
    h = h < 10 ? '0' + h : h
    s = s < 10 ? '0' + s : s

    currentTime.innerHTML = `${h}:${m}:${s} ${ampm}`

    if(alarmTime == `${h}:${m} ${ampm}`){
        console.log('Alarm')

        ringtone.play();
        ringtone.loop = true
    }
}, 1000)

const setAlarm = () => {
    if(isAlarmSet){
        alarmTime = ''
        ringtone.pause()
        content.classList.remove('disable')
        setAlarmBtn.innerHTML = 'Set Alarm'
        return isAlarmSet = false
    }
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`

    if(time.includes('Hour') || time.includes('Minute') || time.includes('AM/PM')){
        return alert('Please, select valid time to set Alarm')
    }
    isAlarmSet = true
    alarmTime = time
    //remove user interaction with options when alarm is set
    content.classList.add('disable')
    setAlarmBtn.innerHTML = 'Reset Alarm'
}

setAlarmBtn.addEventListener('click', setAlarm)



