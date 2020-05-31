import moment from "moment";

class Happening {

    constructor(name, start, end) {
        this.name = name;
        this.start = moment.isMoment(start) ? start : moment(start);
        this.start.second(0).millisecond(0);
        this.end = moment.isMoment(end) ? end : moment(end);
        this.end.second(0).millisecond(0);
    }

    isRunningAt(timepoint) {
        if (! moment.isMoment(timepoint)) {
            timepoint = moment(timepoint);
        }

        return timepoint.isBetween(this.start, this.end);
    }

}

export default Happening;