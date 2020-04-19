
document.addEventListener("DOMContentLoaded", () => {

    // preps
    let now = new Date();
    const currentTimeElement = document.getElementById('current-time');
    const countdownElement = document.getElementById('countdown');
    const congregationTypeElement = document.getElementById('congregation')

    // check which congregation is the next one
    const weekday = now.getDay(); // 0 = sunday, 1 = monday, etc.)
    let isLudzNext = (weekday >= 1 && weekday <= 5) ; // Montag - Freitag
    let isPublicNext = (weekday === 0 || weekday === 6); // Samstag - Sonntag

    const nextCongregation = new Date();
    if (isLudzNext) {
        // get date of next friday
        const diffWeekdays = 5 - now.getDay();
        nextCongregation.setDate( now.getDate() + diffWeekdays);
        nextCongregation.setHours(19, 0, 0, 0);
        congregationTypeElement.textContent = "Leben- und Dienstzusammenkunft"
    }

    if (isPublicNext) {
        const diffWeekdays = (now.getDay() === 6) ? 1 : 0;
        nextCongregation.setDate( now.getDate() + diffWeekdays);
        nextCongregation.setHours(13, 0, 0, 0);
        congregationTypeElement.textContent = "Öffentliche Zusammenkunft"
    }


   var interval = setInterval(() => {
        // current time
       now = new Date();
        currentTimeElement.textContent = now.getHours() + ':' + addZero(now.getMinutes()) + ' Uhr';

        // countdown
        let timeDifference = nextCongregation - now;
        remainingMinutes = Math.ceil(timeDifference/1000/60); // convert in minutes and round up

        if (remainingMinutes > 0) {
            countdownElement.textContent = remainingMinutes;
        } else {
            countdownElement.textContent = 0;
        }

        console.log(remainingMinutes);
    }, 1000)
});

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}