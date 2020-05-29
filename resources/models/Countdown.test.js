import Meeting from "./Meeting";
import {expect} from "@jest/globals";
import Countdown from "./Countdown";
import moment from "moment";

it('should get the remaing time until the start of the event', () => {
    // Arrange
    const meeting = new Meeting({ day: 'Freitag', time: '19:00', name: 'Test'})
    const now = moment();
    // Act
    const countdown = new Countdown(meeting);
    // Assert
    expect(meeting.next().diff(now, 'minute')).toEqual(countdown.remainingTime());
});