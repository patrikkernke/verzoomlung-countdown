import RegularMeeting from "./RegularMeeting";
import moment from "moment";
import {expect} from "@jest/globals";

it('should return the full date of the next event', () => {
    const referenceDate = moment('2020-05-27 12:12:10'); // Mittwoch
    const meeting = new RegularMeeting('Freitag', '19:00', '21:45', referenceDate.clone());
    expect(meeting.next().toString()).toEqual(moment('2020-05-29 19:00:00').toString());
});

it('should return the same day during the event ', () => {
    // before event
    let now = moment('2020-05-29 19:12:10');
    let meeting = new RegularMeeting('Freitag', '19:00', '21:45', now.clone());
    expect(meeting.next().toString()).toEqual(moment('2020-05-29 19:00:00').toString());
});

it('should return the next week after the event', () => {
    // before event
    let now = moment('2020-05-29 22:12:10');
    let meeting = new RegularMeeting('Freitag', '19:00', '21:45', now.clone());
    expect(meeting.next().toString()).toEqual(moment('2020-06-05 19:00:00').toString());
});

it('should return the same result on sundays', () => {
    const referenceDate = moment('2020-05-24 12:12:10'); // Samstag
    const meeting = new RegularMeeting('Sonntag', '13:00', '13:45', referenceDate.clone());
    expect(meeting.next().toString()).toEqual(moment('2020-05-24 13:00:00').toString());
});