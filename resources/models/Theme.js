import moment from "moment";

class Theme {
    constructor(name, topic, cssTheme, imageSrc) {
        this.name = name;
        this.topic = topic;
        this.cssTheme = cssTheme;
        this.imageSrc = imageSrc;
        this.dates = [];
    }

    shouldActivate() {
        let shouldActivate = false;

        const today = moment();
        this.dates.forEach((date) => {
           if (date.isSame(today, 'day')) shouldActivate = true;
        });

        return shouldActivate;
    }

    addDate(date) {
        let parsedDate = moment.isMoment(date) ? date : moment(date);
        this.dates.push(parsedDate);

        return parsedDate;
    }

    showCongressStyle() {
        const bodyElement = document.querySelector('body');
        const footerElement = document.querySelector('footer');
        const congregationTypElement = document.getElementById('congregation-type');
        const backgroundImage = document.querySelector('#background-image img')

        bodyElement.classList.add(this.cssTheme);
        let topicElement = document.createElement('header');
        topicElement.innerText = this.topic;
        footerElement.prepend(topicElement);
        congregationTypElement.innerText = this.name;
        backgroundImage.setAttribute('src', this.imageSrc);
    }
}

export default Theme;