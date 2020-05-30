import moment from "moment";

class Happening {

    constructor(name, start, end) {
        this.name = name;
        this.start = moment.isMoment(start) ? start : moment(start);
        this.end = moment.isMoment(end) ? end : moment(end);
    }

}

export default Happening;