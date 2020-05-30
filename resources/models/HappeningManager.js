
class HappeningManager {

    constructor() {
        this._happenings = [];
    }

    addHappening(happening) {
        this._happenings.push(happening);
        return this;
    }

    getHappenings(startdate = null) {

        let result = this._happenings;

        if (startdate !== null) {
            result = this._happenings.filter((happening) => {
                return startdate.isBefore(happening.end);
            });
        }

        return this._sort(result);
    }

    addRegularHappening(regularHappening, startingFrom, endingAt) {
        regularHappening.basedate = startingFrom;

        while (regularHappening.basedate.isSameOrBefore(endingAt)) {
            let nextHappening = regularHappening.nextOccurence();
            this.addHappening(nextHappening);

            regularHappening.basedate = nextHappening.end.clone().add(1, 'second');
        }

        return this;
    }

    getHappeningsForDay(day) {
        const result = this._happenings.filter((happening) => {
            return day.isSame(happening.start, 'day');
        });

        return this._sort(result);
    }

    _sort(result) {
        return result.sort((a, b) => {
            return a.start.diff(b.start);
        })
    }
}

export default HappeningManager;