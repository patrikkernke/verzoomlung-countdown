import moment from 'moment';
import Meeting from "./models/Meeting";
import Countdown from "./models/Countdown";
import Congress from "./models/Congress";
import RepeatingHappening from "./models/RepeatingHappening";
import HappeningManager from "./models/HappeningManager";

const ludzMeeting = new RepeatingHappening('Freitag', '19:00', '21:45')
const publicMeeting = new RepeatingHappening('Sonntag', '13:00', '14:45')

const congressDays = [
  new Congress({date: '2020-05-30', topic: 'Liebe Jehova mit deinem ganzen Herzen'}),
  new Congress({date: '2020-06-06', topic: 'Liebe Jehova mit deinem ganzen Herzen'}),
  new Congress({date: '2020-06-13', topic: 'Liebe Jehova mit deinem ganzen Herzen'}),
];

const manager = new HappeningManager();
manager.addRegularHappening(ludzMeeting, moment(), moment(21, 'day'));
manager.addRegularHappening(publicMeeting, moment(), moment(21, 'day'));

document.addEventListener("DOMContentLoaded", () => {

    const bodyElement = document.getElementsByTagName("BODY")[0];
    const currentTimeElement = document.getElementById('current-time');
    const countdownElement = document.getElementById('countdown');
    const congregationTypeElement = document.getElementById('congregation');
    const congregationSourceElement = document.getElementById('congregationSource');
    const backgroundImage = document.getElementById('background-image');

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
