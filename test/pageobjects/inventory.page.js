import Page from './page.js';

class InventoryPage extends Page {
    /**
     * define selectors using getter methods
     */
    get list() {
        return $('div[data-test="inventory-list"]');
    }

    get item() {
        return $('div[data-test="inventory-item"]');
    }

    get cartLink() {
        return $('a[data-test="shopping-cart-link"]');
    }

    get cartBage() {
        return $('span[data-test="shopping-cart-badge"]');
    }

    get burger() {
        return $('button[id="react-burger-menu-btn"]');
    }

    get allItemsBtn() {
        return $('a[data-test="inventory-sidebar-link"]');
    }

    get about() {
        return $('a[data-test="about-sidebar-link"]');
    }

    get logout() {
        return $('a[data-test="logout-sidebar-link"]');
    }

    get reset() {
        return $('a[data-test="reset-sidebar-link"]');
    }

    get itemAddToCartBtn() {
        return $('button[data-test^="add-to-cart"]');
    }


    get sort() {
        return $('select[data-test="product-sort-container"]');
    }

    get allItems() {
        return $$('div[data-test="inventory-item-name"]');
    }

    get twitter() {
        return $('a[data-test="social-twitter"]');
    }

    get facebook() {
        return $('a[data-test="social-facebook"]');
    }

    get linkedin() {
        return $('a[data-test="social-linkedin"]');
    }

    get allPrices() {
        return $$('div[data-test="inventory-item-price"]');
    }

    open() {
        return super.open('inventory.html');
    }

    async isOpen() {
        const url = await browser.getUrl();
        return url.includes('inventory.html') && await this.list.isDisplayed();
    }
}
export default new InventoryPage();
