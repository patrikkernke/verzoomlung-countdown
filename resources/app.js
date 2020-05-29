import moment from 'moment';
import Meeting from "./models/Meeting";
import Countdown from "./models/Countdown";
import Congress from "./models/Congress";
import RegularMeeting from "./models/RegularMeeting";

const ludzMeeting = new RegularMeeting('Freitag', '19:00', '21:45')
const publicMeeting = new RegularMeeting('Sonntag', '13:00', '14:45')

const congressDays = [
  new Congress({date: '2020-05-30', topic: 'Liebe Jehova mit deinem ganzen Herzen'}),
  new Congress({date: '2020-06-06', topic: 'Liebe Jehova mit deinem ganzen Herzen'}),
  new Congress({date: '2020-06-13', topic: 'Liebe Jehova mit deinem ganzen Herzen'}),
];

let nextMeeting = (ludzMeeting.next().isBefore(publicMeeting.next()))
    ? ludzMeeting
    : publicMeeting;

// WEITERES MUSS ANGEPASST WERDEN

congressDays.forEach((congress) => {
    const today = moment();
    if (congress.date.isSame(today, 'day')) {
       nextMeeting = congress;
    }
});

const countdown = new Countdown(nextMeeting)

document.addEventListener("DOMContentLoaded", () => {

    const bodyElement = document.getElementsByTagName("BODY")[0];
    const currentTimeElement = document.getElementById('current-time');
    const countdownElement = document.getElementById('countdown');
    const congregationTypeElement = document.getElementById('congregation');
    const congregationSourceElement = document.getElementById('congregationSource');
    const backgroundImage = document.getElementById('background-image');

    if (countdown.isForCongress()) {
        bodyElement.classList.add('congress');
    }

    backgroundImage.src = countdown.isForCongress()
        ? '/images/kongress-liebe-jehova.png'
        : '/images/erste-christen-versammlung.png'

    congregationTypeElement.textContent = countdown.isForCongress()
        ? countdown.meeting.topic
        : countdown.meeting.name;

    congregationSourceElement.textContent = countdown.isForCongress()
        ? 'Kongress'
        : 'Versammlung Neuwied';



    let interval = setInterval(() => {
        currentTimeElement.textContent = moment().format('HH:mm [Uhr]');
        const remainingMinutes = countdown.remainingTimeUntilStart().toString()

        let displayRemainingMinutes = `${remainingMinutes.toString()}<span class="text-4xl font-black tracking-normal">min</span>`;

        if (remainingMinutes > 60) {
            const hours = Math.floor(remainingMinutes/60);
            const minutes = remainingMinutes % 60;
            displayRemainingMinutes = `${hours}<span class="text-4xl font-black tracking-normal">h ${minutes}min</span>`;
        }

        countdownElement.innerHTML = displayRemainingMinutes;
    }, 1000);

});
