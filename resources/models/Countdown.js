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
        this.referenceDate = (referenceDate !== null) ? moment(referenceDate) : moment();
    }

    remainingTimeUntilStart() {
        const appointmentTime = this.isForCongress()
            ? this._getNextCongressAppointment()
            : this.meeting.next();

        const remainingMinutes = appointmentTime.diff(this.referenceDate, 'minutes');
        return remainingMinutes > 0 ? remainingMinutes : 0;
    }

    isForCongress() {
        return this.meeting instanceof Congress;
    }

    _getNextCongressAppointment() {
        return this.meeting.program.morning.isAfter(this.referenceDate)
            ? this.meeting.program.morning
            : this.meeting.program.afternoon;
    }
}

export default Countdown;