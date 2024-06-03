import InventoryPage from '../pageobjects/inventory.page.js'

import LoginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js';

describe('Inventory Sort test', async () => {
    before(async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
    });

    it('should sort items by name from Z to A', async () => {
        await inventoryPage.sort.selectByAttribute('value', 'za')
        const itemNameTexts = await InventoryPage.allItems.map((item) => item.getText())
        //console.log('check names ZA', itemNameTexts)
        const sortedNames = [...itemNameTexts].sort((a, b) => b.localeCompare(a))
        expect(itemNameTexts).toEqual(sortedNames)
    });

    it('should sort items by name from A to Z', async () => {
        await inventoryPage.sort.selectByAttribute('value', 'az')
        const itemNameTexts = await InventoryPage.allItems.map((item) => item.getText())
        //console.log('check names AZ', itemNameTexts)
        const sortedNames = [...itemNameTexts].sort((a, b) => a.localeCompare(b))
        expect(itemNameTexts).toEqual(sortedNames)
    });

    it('should sort items by price from low to high', async () => {
        await inventoryPage.sort.selectByAttribute('value', 'lohi')
        const itemPrices = await InventoryPage.allPrices.map(async (item) => {
            const priceText = await item.getText();
            return parseFloat(priceText.replace('$', ''));
        });
        //console.log('check price', itemPrices)
        const sortedPrices = [...itemPrices].sort((a, b) => a - b)
        expect(itemPrices).toEqual(sortedPrices)
    });

    it('should sort items by price from high to low', async () => {
        await inventoryPage.sort.selectByAttribute('value', 'hilo')
        const itemPrices = await InventoryPage.allPrices.map(async (item) => {
            const priceText = await item.getText();
            return parseFloat(priceText.replace('$', ''));
        });
        // console.log('check price', itemPrices)
        const sortedPrices = [...itemPrices].sort((a, b) => b - a)
        expect(itemPrices).toEqual(sortedPrices)
    });
});