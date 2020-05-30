import moment from "moment";
import Happening from "./Happening";

class RegularHappening {

    constructor(name, weekday, startTime, endTime, basedate) {
        this._name = name;
        this.basedate = basedate;
        this._weekday = weekday;
        this._start = { hour: parseInt(startTime.split(':')[0]), minute: parseInt(startTime.split(':')[1])}
        this._end = { hour: parseInt(endTime.split(':')[0]), minute: parseInt(endTime.split(':')[1])}
    }

    nextOccurence() {
        return new Happening(this._name, this._calculateStart(), this._calculateEnd());
    }

    get basedate() {
        return this._basedate.clone();
    }

    set basedate(value) {
        this._basedate = moment.isMoment(value) ? value : moment(value)
    }

    _calculateStart() {
        const date = this.basedate.day(this._weekday).hour(this._start.hour).minute(this._start.minute).second(0).millisecond(0);

        return this.basedate.isAfter(this._unchangedEndDate())
            ? date.add(7, 'day')
            : date;
    }

    _calculateEnd() {
        const date = this.basedate.day(this._weekday).hour(this._end.hour).minute(this._end.minute).second(0).millisecond(0);

        return this.basedate.isAfter(this._unchangedEndDate())
            ? date.add(7, 'day')
            : date;
    }

    _unchangedEndDate() {
        return this.basedate.day(this._weekday).hour(this._end.hour).minute(this._end.minute).second(0).millisecond(0);
    }
}

export default RegularHappening;