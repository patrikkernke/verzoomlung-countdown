import Meeting from "./Meeting";
import Congress from "./Congress";
import moment from "moment";

class Countdown {
    /**
     * @param {Meeting|Congress} meeting
     * @param {string} [referenceDate]
     */
    constructor(meeting, referenceDate = null) {
        this.meeting = meeting;
        this.referenceDate = referenceDate;
    }

    remainingTimeUntilStart() {
        const appointmentTime = this.isForCongress()
            ? this._getNextCongressAppointment()
            : this.meeting.next();

        const remainingMinutes = appointmentTime.diff(moment(), 'minutes');
        return remainingMinutes > 0 ? remainingMinutes : 0;
    }

    isForCongress() {
        return this.meeting instanceof Congress;
    }

    _getNextCongressAppointment() {
        return this.meeting.program.morning.isAfter(moment())
            ? this.meeting.program.morning
            : this.meeting.program.afternoon;
    }

    _getRefDate() {
        return (this.referenceDate === null) ? moment() : moment(this.referenceDate);
    }

}

export default Countdown;