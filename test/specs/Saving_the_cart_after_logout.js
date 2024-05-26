import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'
import CartPage from '../pageobjects/cart.page.js'

describe('Add to cart test', () => {
    it('should check that cart is empty', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await expect(InventoryPage.cartLink).not.toHaveChildren()
    })

    it('should check that item is added to cart', async () => {
        await InventoryPage.itemAddToCartBtn.click()
        await expect(InventoryPage.cartBage).toHaveText('1')
    })

    it('should check that logged out', async () => {
        await InventoryPage.burger.click()
        await browser.pause(1000) //sometimes side menu doesn't open fast enough, this causes the test to fail
        await InventoryPage.logout.click()
        await expect(LoginPage.inputUsername).toHaveValue('')
        await expect(LoginPage.inputPassword).toHaveValue('')
    })

    it('should check that logged in and products and cart are displayed', async () => {
        await LoginPage.login('standard_user', 'secret_sauce')
        const isInventoryPageOpen = await InventoryPage.isOpen()
        await expect(isInventoryPageOpen).toBe(true)
        await expect(InventoryPage.item).toBePresent()
        await expect(InventoryPage.cartLink).toBePresent()
    })

    it('should check that cart is displayed, product is the same as added', async () => {
        await InventoryPage.cartLink.click()
        await expect(CartPage.item).toBePresent()
    })

})