import RepeatingHappening from "./RepeatingHappening";
import moment from "moment";
import {expect} from "@jest/globals";
import Happening from "./Happening";


it('should accept a basedate as moment', () => {
    const now = moment('2020-05-27 12:12:10');
    const repeatingHappening = new RepeatingHappening('Test', 'Freitag', '19:00', '21:45', now.clone());

    expect(repeatingHappening.basedate).toEqual(now);
});

it('should accept a basedate as string', () => {
    const nowString = '2020-05-27 12:12:10';
    const repeatingHappening = new RepeatingHappening('Test','Freitag', '19:00', '21:45', nowString);

    expect(repeatingHappening.basedate).toEqual(moment(nowString));
});

it('should pass the name to the received happening', () => {
    const nowString = '2020-05-27 12:12:10';
    const name = 'Beispiel;'
    const repeatingHappening = new RepeatingHappening(name,'Freitag', '19:00', '21:45', nowString);
    const happening = repeatingHappening.nextOccurence();

    expect(happening.name).toBe(name);
});

it('should return the next happening', () => {
    const now = '2020-05-27 12:12:10'; // Mittwoch
    const repeatingHappening = new RepeatingHappening('Test','Freitag', '19:00', '21:45', now);
    const receivedHappening = repeatingHappening.nextOccurence();

    expect(receivedHappening).toBeInstanceOf(Happening);
    expect(receivedHappening.start.toISOString()).toEqual(moment('2020-05-29 19:00:00').toISOString());
    expect(receivedHappening.end.toISOString()).toEqual(moment('2020-05-29 21:45:00').toISOString());
});

it('should return the happening on the same day', () => {
    const now = moment('2020-05-29 19:12:10');
    const repeatingHappening = new RepeatingHappening('Test','Freitag', '19:00', '21:45', now.clone());
    const receivedHappening = repeatingHappening.nextOccurence();

    expect(receivedHappening.start.toISOString()).toEqual(moment('2020-05-29 19:00:00').toISOString());
    expect(receivedHappening.end.toISOString()).toEqual(moment('2020-05-29 21:45:00').toISOString());
});

it('should return the next week after the event', () => {
    const now = moment('2020-05-29 22:12:10');
    const repeatingHappening = new RepeatingHappening('Test','Freitag', '19:00', '21:45', now.clone());
    const receivedHappening = repeatingHappening.nextOccurence();

    expect(receivedHappening.start.toISOString()).toEqual(moment('2020-06-05 19:00:00').toISOString());
    expect(receivedHappening.end.toISOString()).toEqual(moment('2020-06-05 21:45:00').toISOString());
});

it('should behave identical for sundays', () => {
    const now = moment('2020-05-24 12:12:10'); // Samstag
    const repeatingHappening = new RepeatingHappening('Test','Sonntag', '13:00', '14:45', now.clone());
    const receivedHappening = repeatingHappening.nextOccurence();

    expect(receivedHappening.start.toISOString()).toEqual(moment('2020-05-24 13:00:00').toISOString());
    expect(receivedHappening.end.toISOString()).toEqual(moment('2020-05-24 14:45:00').toISOString());
});