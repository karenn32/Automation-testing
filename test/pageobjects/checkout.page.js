import Page from './page.js';

class CheckoutPage extends Page {
    /**
     * define selectors using getter methods
     */

    get checkoutForm() {
        return $('div[data-test="checkout-info-container"]');
    }

    get continueBtn() {
        return $('input[data-test="continue"]');
    }

    get firstName() {
        return $('input[data-test="firstName"]');
    }

    get lastName() {
        return $('input[data-test="lastName"]');
    }

    get postalCode() {
        return $('input[data-test="postalCode"]');
    }

    get cancelBtn() {
        return $('button[data-test="cancel"]');
    }

    open() {
        return super.open('checkout-step-one.html');
    }

    async isOpen() {
        const url = await browser.getUrl();
        return url.includes('checkout-step-one.html');
    }
}

export default new CheckoutPage();