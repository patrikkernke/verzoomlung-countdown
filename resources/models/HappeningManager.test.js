import HappeningManager from "./HappeningManager";
import {expect, it} from "@jest/globals";
import Happening from "./Happening";
import moment from "moment";
import RepeatingHappening from "./RepeatingHappening";

it('should return an array of happenings', () => {
    const startdate = moment('2020-04-20');
    const manager = new HappeningManager();
    const event1 = new Happening('Test1', '2020-04-30 12:00', '2020-04-30 15:00');
    const event2 = new Happening('Test2', '2020-05-12 20:00', '2020-05-12 21:30');

    manager.addHappening(event1).addHappening(event2);
    const result = manager.getHappenings();

    expect(result).toContain(event1);
    expect(result).toContain(event2);
});

it('should return an array of happenings from a startingpoint', () => {
    const startdate = moment('2020-05-01');
    const manager = new HappeningManager();
    const event1 = new Happening('Test1', '2020-04-30 12:00', '2020-04-30 15:00');
    const event2 = new Happening('Test2', '2020-05-12 20:00', '2020-05-12 21:30');

    manager.addHappening(event1).addHappening(event2);
    const result = manager.getHappenings(startdate);

    expect(result).not.toContain(event1);
    expect(result).toContain(event2);
});

it('should add a regular meeting from a start until end date', () => {
    const regularHappening = new RepeatingHappening('Öffentliche Zusammenkunft', 'Sonntag', '13:00', '14:45');

    const manager = new HappeningManager();

    manager.addRegularHappening(regularHappening, moment('2020-05-01'), moment('2020-05-31'));
    const result = manager.getHappenings();

    expect(result.length === 5).toBeTruthy();
});

it('should sort the happenings by starting date', () => {
    const startdate = moment('2020-01-01');
    const manager = new HappeningManager();
    const event1 = new Happening('Test1', '2020-06-30 12:00', '2020-06-30 15:00');
    const event2 = new Happening('Test2', '2020-05-12 20:00', '2020-05-12 21:30');
    const event3 = new Happening('Test3', '2020-01-01 01:00', '2020-01-01 21:30');

    manager.addHappening(event1).addHappening(event2).addHappening(event3);
    const result = manager.getHappenings(startdate);

    expect(result.length === 3).toBeTruthy();
    expect(result[0]).toBe(event3);
    expect(result[1]).toBe(event2);
    expect(result[2]).toBe(event1);
});
