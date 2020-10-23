import { select, settings } from './settings.js';

class AmountWidget {
    constructor(element) {
        const thisWidget = this;

        thisWidget.getElements(element);
        thisWidget.initActions();

        thisWidget.value = settings.amountWidget.defaultValue;
        thisWidget.dom.input.value = settings.amountWidget.defaultValue;
    }

    getElements(element) {
        const thisWidget = this;

        thisWidget.dom = {};
        thisWidget.dom.wrapper = element;

        thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.amount.input);
        thisWidget.dom.linkDecrease = thisWidget.dom.wrapper.querySelector(select.widgets.amount.linkDecrease);
        thisWidget.dom.linkIncrease = thisWidget.dom.wrapper.querySelector(select.widgets.amount.linkIncrease);
    }

    setValue(value) {
        const thisWidget = this;

        const newValue = parseInt(value);

        console.log(newValue);
        /*TO DO add validation */

        thisWidget.value = newValue;
        thisWidget.dom.input.value = thisWidget.value;

        if (newValue != thisWidget.value && value >= settings.amountWidget.defaultMin && value <= settings.amountWidget.defaultMax) {
            thisWidget.correctValue = newValue;
        }

        thisWidget.announce();

    }

    announce() {
        const thisWidget = this;
        const event = new CustomEvent('updated', {
            bubbles: true
        });
        thisWidget.dom.wrapper.dispatchEvent(event);
    }

    initActions() {
        const thisWidget = this;

        thisWidget.dom.input.addEventListener('change', function () {
            thisWidget.value = thisWidget.dom.input.value;
        });

        thisWidget.dom.linkDecrease.addEventListener('click', function (event) {
            event.preventDefault();
            console.log('test');
            thisWidget.setValue(thisWidget.value - 1);
        });

        thisWidget.dom.linkIncrease.addEventListener('click', function (event) {
            event.preventDefault();

            console.log('test');
            thisWidget.setValue(thisWidget.value + 1);
        });

    }

}

export default AmountWidget;