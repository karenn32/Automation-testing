import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'
import CartPage from '../pageobjects/cart.page.js';
import CheckoutPage from '../pageobjects/checkout.page.js';
import OverviewPage from '../pageobjects/overveiw.page.js';
import CompletePage from '../pageobjects/complete.page.js';
import { getNumberFromString } from '../../utils/regexToNumber.js';
import completePage from '../pageobjects/complete.page.js';

describe('Valid checkout test', () => {
    before(async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
    });

    it('should check that item is added to cart', async () => {
        const isInventoryPageOpen = await InventoryPage.isOpen()
        await expect(isInventoryPageOpen).toBe(true)
        await InventoryPage.itemAddToCartBtn.click()
        await expect(InventoryPage.cartBage).toHaveText('1')
    })

    it('should check that cart page is displayed and product is same as added', async () => {
        await InventoryPage.cartBage.click()
        const isCartPageOpen = await CartPage.isOpen()
        await expect(isCartPageOpen).toBe(true)
        await expect(CartPage.item).toBePresent()
    });

    it('should check that checkout form is opened', async () => {
        await CartPage.checkoutBtn.click()
        const isCkeckoutPageOpen = await CheckoutPage.isOpen()
        await expect(isCkeckoutPageOpen).toBe(true)
        await expect(CheckoutPage.checkoutForm).toBePresent()
    });

    it('should check that overview page is opened and price is correct', async () => {
        await CheckoutPage.firstName.setValue('asdasd')
        await CheckoutPage.lastName.setValue('sasas')
        await CheckoutPage.postalCode.setValue('asddasd')
        await CheckoutPage.continueBtn.click()
        const isOverviewPageOpen = await OverviewPage.isOpen()
        await expect(isOverviewPageOpen).toBe(true)
        await expect(OverviewPage.item).toBePresent()
        const totalAmountText = await OverviewPage.total.getText()
        const actualTotalPrice = Number(getNumberFromString(totalAmountText))
        const taxAmmountText = await OverviewPage.tax.getText()
        const taxAmmount = Number(getNumberFromString(taxAmmountText))
        const calculatedTotalPrice = await OverviewPage.calculateTotal() + taxAmmount        
        // console.log('Calculated', calculatedTotalPrice)
        // console.log('Aactual', actualTotalPrice)
        expect(calculatedTotalPrice).toEqual(actualTotalPrice)
    });

    it('should check that user is redirected to the Checkout Complete page', async () => {
        await OverviewPage.finishBtn.click()
        const isCompletePageOpen = await completePage.isOpen()
        await expect(isCompletePageOpen).toBe(true)
        await expect(CompletePage.completeHeader).toBePresent()
    });

    it('should check that user is redirected to the Checkout Complete page', async () => {
        await completePage.backBtn.click()
        const isInventoryPageOpen = await InventoryPage.isOpen()
        await expect(isInventoryPageOpen).toBe(true)
        await expect(InventoryPage.cartLink).not.toHaveChildren()
    });


})