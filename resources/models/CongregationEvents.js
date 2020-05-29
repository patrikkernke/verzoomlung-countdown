import moment from "moment";

class CongregationEvents {

    constructor() {
        this.meeting = {
            ludz: { day: 5, hour: 19, minute: 0 }, // Friday 19:00
            public: { day: 0, hour: 13, minute: 0 }, // Sunday 13:00
        }
    }

    nextLudz() {
        return moment().day(this.meeting.ludz.day)
                .hour(this.meeting.ludz.hour)
                .minute(this.meeting.ludz.minute)
                .second(0)
                .millisecond(0);
    }

    nextPublic() {
        const now = moment();
        return now.day(this.meeting.public.day + 7) // week begins with Sunday we need the one from next week
            .hour(this.meeting.public.hour)
            .minute(this.meeting.public.minute)
            .second(0)
            .millisecond(0);
    }
}

export default new CongregationEvents();