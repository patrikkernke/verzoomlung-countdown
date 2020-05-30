import Happening from "./Happening";
import {expect} from "@jest/globals";
import moment from 'moment';

it('should accept moment data für the start and end parameter', () => {
    const start = moment('2020-01-12 12:00');
    const end = moment('2020-01-12 13:00');
    const happening = new Happening('Test', start, end);

    expect(happening.start).toEqual(start);
    expect(happening.end).toEqual(end);
});

it('should accept start and end data as string', () => {
    const start = '2020-01-12 12:00';
    const end = '2020-01-12 13:00';
    const happening = new Happening('Test', start, end);

    expect(happening.start).toEqual(moment(start));
    expect(happening.end).toEqual(moment(end));
});