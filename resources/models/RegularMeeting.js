import moment from "moment";

class RegularMeeting {

    constructor(day, startTime, endTime, now = null) {
        this.nowOverwritten = now;
        this.day = day;
        this.startTime = { hour: parseInt(startTime.split(':')[0]), minute: parseInt(startTime.split(':')[1])}
        this.endTime = { hour: parseInt(endTime.split(':')[0]), minute: parseInt(endTime.split(':')[1])}
    }

    next() {
        return this._startDate();
    }

    _now() {
        return (this.nowOverwritten === null) ? moment() : this.nowOverwritten.clone();
    }

    _startDate() {
        const date = this._now().day(this.day).hour(this.startTime.hour).minute(this.startTime.minute).second(0).millisecond(0);

        return this._now().isAfter(this._unchangedEndDate())
            ? date.add(7, 'day')
            : date;
    }

    _endDate() {
        const date = this._now().day(this.day).hour(this.endTime.hour).minute(this.endTime.minute).second(0).millisecond(0);

        return this._now().isAfter(this._unchangedEndDate())
            ? date.add(7, 'day')
            : date;
    }

    _unchangedEndDate() {
        return this._now().day(this.day).hour(this.endTime.hour).minute(this.endTime.minute).second(0).millisecond(0);
    }
}

export default RegularMeeting;