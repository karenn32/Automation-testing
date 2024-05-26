import { $ } from '@wdio/globals'
import Page from './page.js';

class CartPage extends Page {
    /**
     * define selectors using getter methods
     */
    
    get item () {
        return $('div[data-test="inventory-item-name"]');
    }

    get checkoutBtn (){
        return $('button[data-test="checkout"]');
    }

    open () {
        return super.open('cart.html');
    }

    async isOpen() {
        const url = await browser.getUrl();
        return url.includes('cart.html') && await this.item.isDisplayed();
    }
}

export default new CartPage();