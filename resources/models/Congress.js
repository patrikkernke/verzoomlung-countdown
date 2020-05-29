import moment from "moment";

class Congress {

    /**
     * @param {object} data
     * @param {string} data.date
     * @param {string} data.topic
     */
    constructor(data) {
        this.date = moment(data.date);
        this.topic = data.topic;
        this.program = {
            morning: this.date.clone().hour(9).minute(40)
                .second(0).millisecond(0),
            afternoon: this.date.clone().hour(13).minute(20)
                .second(0).millisecond(0)
        }
    }
}

export default Congress;