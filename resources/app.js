import moment from 'moment';
import RepeatingHappening from "./models/RepeatingHappening";
import HappeningManager from "./models/HappeningManager";
import Happening from "./models/Happening";

moment.locale('de');

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

manager.addHappening(new Happening('Taufansprache', moment('2020-06-20 09:30'), moment('2020-06-20 10:15')));
manager.addHappening(new Happening('Wachtturmstudium', moment('2020-07-12 10:00'), moment('2020-07-12 10:35')));
manager.addHappening(new Happening('Regionaler Kongress (Freitag Vormittag)', moment('2020-07-12 10:40'), moment('2020-07-12 14:20')));
manager.addHappening(new Happening('Wachtturmstudium', moment('2020-07-19 10:00'), moment('2020-07-19 10:35')));
manager.addHappening(new Happening('Regionaler Kongress (Freitag Nachmittag)', moment('2020-07-19 10:40'), moment('2020-07-19 14:20')));

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
        let isAHappeningRunning = false;

        dayHappenings.forEach((happening) => {
            if (happening.isRunningAt(now)) isAHappeningRunning = true;

            // countdown
            const diffInSeconds = happening.start.diff(now, 'second');

            if (diffInSeconds < (60*60) && diffInSeconds >= 0) {
                const diffInMinutes = happening.start.diff(now, 'minute');
                const countdownHtml = `<span class="font-bold text-4xl tracking-normal">noch</span>${diffInMinutes +1}<span class="font-bold text-4xl tracking-normal">min</span>`;

                if (countdownElement.innerHTML !== countdownHtml && !showCountdown && !isAHappeningRunning) { // wenn noch kein Countdown vorhanden ist und auch kein Event gerade stattfindet
                    countdownElement.innerHTML = countdownHtml;
                }

                showCountdown = true;
            }
        });

        if (!showCountdown || isAHappeningRunning) { countdownElement.innerHTML = ''; }

        refreshProgram(dayHappenings, programElement, now)
    }, 1000);

});

function refreshProgram(happenings, element, now) {
    if (happenings.length <= 0 ) {
        return;
    }

    let html = '';
    happenings.forEach((happening) => {
        if (happening.isRunningAt(now)) {
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