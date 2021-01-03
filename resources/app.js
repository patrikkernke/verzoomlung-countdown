import moment from 'moment';
import RepeatingHappening from "./models/RepeatingHappening";
import HappeningManager from "./models/HappeningManager";
import Happening from "./models/Happening";
import Theme from "./models/Theme";

// preparations
moment.locale('de');
const ludzMeeting = new RepeatingHappening('Leben- und Dienstzusammenkunft', 'Freitag', '19:00', '21:45');
const publicMeeting = new RepeatingHappening('Öffentlicher Vortrag', 'Sonntag', '10:00', '10:35')
const wtStudy = new RepeatingHappening('Wachtturmstudium', 'Sonntag', '10:35', '11:45')


// -------------------
//  EVENT MANAGER
// -------------------
const manager = new HappeningManager();
manager.addRegularHappening(ludzMeeting, moment().subtract(1, 'day'), moment().add(21, 'day'));
manager.addRegularHappening(publicMeeting, moment().subtract(1, 'day'), moment().add(21, 'day'));
manager.addRegularHappening(wtStudy, moment().subtract(1, 'day'), moment().add(21, 'day'));

// Regionaler Kongress – Freut euch immer - Sonntag Vormittagsprogramm
manager.addHappening(new Happening('Wachtturmstudium', moment('2020-08-23 10:00'), moment('2020-08-23 10:30')));
manager.addHappening(new Happening('Regionaler Kongress (Sonntag Vormittag)', moment('2020-08-23 10:50'), moment('2020-08-23 15:00')));
// Regionaler Kongress – Freut euch immer - Sonntag Nachmittagsprogramm
manager.addHappening(new Happening('Wachtturmstudium', moment('2020-08-30 10:00'), moment('2020-08-30 10:30')));
manager.addHappening(new Happening('Regionaler Kongress (Sonntag Nachmittag)', moment('2020-08-30 10:50'), moment('2020-08-30 15:00')));

// Diestwoche
manager.addHappening(new Happening('Leben- und Dienstzusammenkunft', moment('2020-09-22 19:00'), moment('2020-09-22 21:45')));

// -------------------
//  THEMING
// -------------------
const RegionalCongressTheme = new Theme(
    'Regionaler Kongress',
    '„Freut euch immer“',
    'regional-congress',
    '/images/kongress_freut-euch-immer.jpg'
);
RegionalCongressTheme.addDate('2020-08-02');
RegionalCongressTheme.addDate('2020-08-09');
RegionalCongressTheme.addDate('2020-08-23');
RegionalCongressTheme.addDate('2020-08-30');


// -------------------
//  Testevents
// -------------------
// const testMeeting = new RepeatingHappening('Test Reguläres Meeting', 'Samstag', '13:35', '14:45');
// manager.addRegularHappening(testMeeting, moment().subtract(1, 'day'), moment().add(21, 'day'));
// manager.addHappening(new Happening('TestKongress', moment().add(1, 'hour'), moment().add(2, 'hours')));
// RegionalCongressTheme.addDate(moment());

// -------------------
//  APP LOGIK
// -------------------
document.addEventListener("DOMContentLoaded", () => {
    window.Verzoomlung = {};
    Verzoomlung.HappeningManager = manager;
    Verzoomlung.TodayHappenings = manager.getHappeningsForDay(moment(), RegionalCongressTheme.shouldActivate());
    Verzoomlung.Themes = [ RegionalCongressTheme ];

    const countdownElement = document.getElementById('countdown');
    const clockElement = document.getElementById('clock');
    const programElement = document.getElementById('program');
    const dateElement = document.getElementById('date');

    //  Vorbereitungen für Themes
    if (RegionalCongressTheme.shouldActivate()) {
        RegionalCongressTheme.showCongressStyle();
    }

    // Falls der Tag Events hat soll eine Liste dieser angezeigt werden
    refreshProgram(Verzoomlung.TodayHappenings, programElement, moment());

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

        Verzoomlung.TodayHappenings.forEach((happening) => {
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

        refreshProgram(Verzoomlung.TodayHappenings, programElement, now)
    }, 1000);

});

function refreshProgram(happenings, element, now) {
    if (happenings.length <= 0 ) {
        return;
    }

    let html = '';
    happenings.forEach((happening) => {
        let cssModifier = happening.isRunningAt(now) ? 'is-current' : '';

        html += `
            <div class="program-entry ${cssModifier}">
                <div class="start-time">${happening.start.format('HH:mm')}</div>
                <div class="description">${happening.name}</div>
            </div>
        `;
    });

    if (element.innerHTML !== html) {
        element.innerHTML = html;
    }
}