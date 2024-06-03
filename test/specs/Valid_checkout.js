
import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'
import cartPage from '../pageobjects/cart.page.js';
import checkoutPage from '../pageobjects/checkout.page.js';
import overviewPage from '../pageobjects/overveiw.page.js';
import completePage from '../pageobjects/complete.page.js';
import { getNumberFromString } from '../../utils/regexToNumber.js';

describe('Valid checkout test', () => {
    before(async () => {
        await loginPage.open()
        await loginPage.login('standard_user', 'secret_sauce')
    });

    it('should check that item is added to cart', async () => {
        const isInventoryPageOpen = await inventoryPage.isOpen()
        await expect(isInventoryPageOpen).toBe(true)
        await inventoryPage.itemAddToCartBtn.click()
        await expect(inventoryPage.cartBage).toHaveText('1')
    })

    it('should check that cart page is displayed and product is same as added', async () => {
        await inventoryPage.cartBage.click()
        const isCartPageOpen = await cartPage.isOpen()
        await expect(isCartPageOpen).toBe(true)
        await expect(cartPage.item).toBePresent()
    });

    it('should check that checkout form is opened', async () => {
        await cartPage.checkoutBtn.click()
        const isCkeckoutPageOpen = await checkoutPage.isOpen()
        await expect(isCkeckoutPageOpen).toBe(true)
        await expect(checkoutPage.checkoutForm).toBePresent()
    });

    it('should check that overview page is opened and price is correct', async () => {
        await checkoutPage.firstName.setValue('asdasd')
        await checkoutPage.lastName.setValue('sasas')
        await checkoutPage.postalCode.setValue('asddasd')
        await checkoutPage.continueBtn.click()
        const isOverviewPageOpen = await overviewPage.isOpen()
        await expect(isOverviewPageOpen).toBe(true)
        await expect(overviewPage.item).toBePresent()
        const totalAmountText = await overviewPage.total.getText()
        const actualTotalPrice = Number(getNumberFromString(totalAmountText))
        const taxAmmountText = await overviewPage.tax.getText()
        const taxAmmount = Number(getNumberFromString(taxAmmountText))
        const calculatedTotalPrice = await overviewPage.calculateTotal() + taxAmmount
        // console.log('Calculated', calculatedTotalPrice)
        // console.log('Aactual', actualTotalPrice)
        expect(calculatedTotalPrice).toEqual(actualTotalPrice)
    });

    it('should check that user is redirected to the Checkout Complete page', async () => {
        await overviewPage.finishBtn.click()
        const isCompletePageOpen = await completePage.isOpen()
        await expect(isCompletePageOpen).toBe(true)
        await expect(completePage.completeHeader).toBePresent()
    });

    it('should check that user is redirected to the Checkout Complete page', async () => {
        await completePage.backBtn.click()
        const isInventoryPageOpen = await inventoryPage.isOpen()
        await expect(isInventoryPageOpen).toBe(true)
        await expect(inventoryPage.cartLink).not.toHaveChildren()
    });


})