import moment from 'moment';
import RepeatingHappening from "./models/RepeatingHappening";
import HappeningManager from "./models/HappeningManager";
import Happening from "./models/Happening";

const ludzMeeting = new RepeatingHappening(
    'Leben- und Dienstzusammenkunft', 'Freitag', '19:00', '21:45'
);
const publicMeeting = new RepeatingHappening(
    'Öffentlicher Vortrag', 'Sonntag', '13:00', '13:35'
)
const wtStudy = new RepeatingHappening(
    'Wachtturmstudium', 'Sonntag', '13:35', '14:45'
)

const manager = new HappeningManager();
manager.addRegularHappening(ludzMeeting, moment().subtract(1, 'day'), moment().add(21, 'day'));
manager.addRegularHappening(publicMeeting, moment().subtract(1, 'day'), moment().add(21, 'day'));
manager.addRegularHappening(wtStudy, moment().subtract(1, 'day'), moment().add(21, 'day'));

document.addEventListener("DOMContentLoaded", () => {

    const countdownElement = document.getElementById('countdown');
    const clockElement = document.getElementById('clock');
    const programElement = document.getElementById('program');
    const dateElement = document.getElementById('date');

    const dayHappenings = manager.getHappeningsForDay(moment());

    // Falls der Tag Events hat soll eine Liste dieser angezeigt werden
    refreshProgram(dayHappenings, programElement, moment());

    // Interval
    let clockTime = moment();
    clockElement.textContent = clockTime.format('HH:mm [Uhr]');
    dateElement.textContent = clockTime.locale('de').format('dddd, Do MMM YYYY')

    let interval = setInterval(() => {

        // Uhrzeit aktualisieren falls nötig
        let now = moment();
        if (clockTime.isBefore(now, 'minute')) {
            clockTime = now;
            clockElement.textContent = now.format('HH:mm [Uhr]');
        }

        // falls ein Event gerade stattfindet darf der Code nicht ausgeführt werden
        let showCountdown = false;
        dayHappenings.forEach((happening) => {
            // countdown
            const diffInSeconds = happening.start.diff(now, 'second');

            if (diffInSeconds < (60*60) && diffInSeconds >= 0) {
                const diffInMinutes = happening.start.diff(now, 'minute');
                const countdownHtml = `<span class="font-bold text-4xl tracking-normal">noch</span>${diffInMinutes +1}<span class="font-bold text-4xl tracking-normal">min</span>`;

                if (countdownElement.innerHTML !== countdownHtml && !showCountdown) {
                    countdownElement.innerHTML = countdownHtml;
                }

                showCountdown = true;
            }
        });

        if (!showCountdown) { countdownElement.innerHTML = ''; }

        refreshProgram(dayHappenings, programElement, now)
    }, 1000);

});

function refreshProgram(happenings, element, now) {
    if (happenings.length <= 0 ) {
        return;
    }

    let html = '';
    happenings.forEach((happening) => {
        if (now.isBetween(happening.start, happening.end)) {
            html += `
                <div class="flex items-center text-2xl text-red-800 mb-4">
                    <div class="py-2 leading-none h-full font-bold text-lg bg-red-300 rounded-lg mr-4 text-red-700 w-20 text-center">
                        ${happening.start.format('HH:mm')}
                    </div>
                    <div class="leading-tight">
                        ${happening.name}
                    </div>
                </div>
            `;
        } else {
            html += `
                <div class="flex items-center text-2xl text-blueish-dark mb-4">
                    <div class="py-2 leading-none h-full font-bold text-lg bg-gray-300 rounded-lg mr-4 text-gray-700 w-20 text-center">
                        ${happening.start.format('HH:mm')}
                    </div>
                    <div class="leading-tight">
                        ${happening.name}
                    </div>
                </div>
            `;
        }
    });

    if (element.innerHTML !== html) {
        element.innerHTML = html;
    }
}