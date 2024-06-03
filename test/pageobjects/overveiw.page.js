
import Page from './page.js';
import { getNumberFromString } from '../../utils/regexToNumber.js';

class OverwiewPage extends Page {
    /**
     * define selectors using getter methods
     */

    get item() {
        return $('div[data-test="inventory-item-name"]');
    }

    get allPrices() {
        return $$('div[data-test="inventory-item-price"]');
    }


    get subtotal() {
        return $('div[data-test="subtotal-label"]');
    }

    get tax() {
        return $('div[data-test="tax-label"]');
    }

    get total() {
        return $('div[data-test="total-label"]');
    }

    get finishBtn() {
        return $('button[data-test="finish"]');
    }

    get cancelBtn() {
        return $('button[data-test="cancel"]');
    }
    open() {
        return super.open('checkout-step-two.html');
    }

    async calculateTotal() {
        const prices = await this.allPrices.map(async (item) => {
            const priceText = await item.getText();
            return Number(getNumberFromString(priceText))
        });
        return prices.reduce((sum, price) => sum + price, 0);
    }


    async isOpen() {
        const url = await browser.getUrl();
        return url.includes('checkout-step-two.html');
    }
}

export default new OverwiewPage();