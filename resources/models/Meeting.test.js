import Meeting from "./Meeting";
import moment from "moment";

it('should return the date for the next meeting', () => {
    // Arrange
    const data = { day: 'Freitag', time: '19:00', name: 'Leben- und Dienstzusammenkunft' }
    // Act
    const meeting = new Meeting(data)
    // Assert
    const expected = moment().day('Freitag').hour(19).minute(0).second(0).millisecond(0);

    expect(expected).toEqual(meeting.next());
});

it('should return the next Sunday not for the current week', () => {
    // Arrange
    const data = { day: 'Sonntag', time: '13:00', name: 'Öffentliche Zusammenkunft' }
    // Act
    const meeting = new Meeting(data)
    // Assert
    const expected = moment().day(0 + 7).hour(13).minute(0).second(0).millisecond(0);
    expect(expected).toEqual(meeting.next());
});

it('should return the name of the meeting', () => {
    // Arrange
    const data = { day: 'Freitag', time: '19:00', name: 'Leben- und Dienstzusammenkunft' }
    // Act
    const meeting = new Meeting(data)
    // Assert
    expect(data.name).toEqual(meeting.name);
});
