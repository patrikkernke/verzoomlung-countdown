import moment from "moment";

class Meeting {

    /**
     * @param {object} data
     * @param {string} data.name
     * @param {string} data.day
     * @param {string} data.time
     */
    constructor(data) {
        this.name = data.name;
        // because moment starts week on sundays (with 0) we have to add 7 for the correct one
        this.day = (data.day === 'Sonntag') ? 7 : data.day;
        this.hour = data.time.split(':')[0];
        this.minute = data.time.split(':')[1];
    }

    next() {
        return moment()
            .day(this.day)
            .hour(this.hour)
            .minute(this.minute)
            .second(0)
            .millisecond(0);
    }
}

export default Meeting;