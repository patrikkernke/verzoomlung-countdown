import moment from 'moment';
import Meeting from "./models/Meeting";
import Countdown from "./models/Countdown";


document.addEventListener("DOMContentLoaded", () => {

    const ludzMeeting = new Meeting({
        name: 'Leben- und Dienstzusammenkunft',
        day: 'Freitag',
        time: '19:00'
    });
    const publicMeeting = new Meeting({
        name: 'Öffentliche Zusammenkunft',
        day: 'Sonntag',
        time: '13:00'
    })

    const countdown = new Countdown(
        (ludzMeeting.next().isBefore(publicMeeting.next()))
            ? ludzMeeting
            : publicMeeting
    )

     const currentTimeElement = document.getElementById('current-time');
     const countdownElement = document.getElementById('countdown');
     const congregationTypeElement = document.getElementById('congregation');

    congregationTypeElement.textContent = countdown.meeting.name;

    let interval = setInterval(() => {
        currentTimeElement.textContent = moment().format('HH:mm [Uhr]');
        countdownElement.textContent = countdown.remainingTime().toString();
    }, 1000);
});
