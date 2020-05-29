import Meeting from "./Meeting";
import moment from "moment";

class Countdown {
    /**
     * @param {Meeting} meeting
     */
    constructor(meeting) {
        this.meeting = meeting;
    }

    remainingTime() {
        return this.meeting.next().diff(moment(), 'minutes');
    }
}

export default Countdown;