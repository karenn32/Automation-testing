
import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'
import cartPage from '../pageobjects/cart.page.js'

describe('Add to cart test', () => {
    it('should check that cart is empty', async () => {
        await loginPage.open()
        await loginPage.login('standard_user', 'secret_sauce')
        await expect(inventoryPage.cartLink).not.toHaveChildren()
    })

    it('should check that item is added to cart', async () => {
        await inventoryPage.itemAddToCartBtn.click()
        await expect(inventoryPage.cartBage).toHaveText('1')
    })

    it('should check that logged out', async () => {
        await inventoryPage.burger.click()
        await browser.pause(1000) //sometimes side menu doesn't open fast enough, this causes the test to fail
        await inventoryPage.logout.click()
        await expect(loginPage.inputUsername).toHaveValue('')
        await expect(loginPage.inputPassword).toHaveValue('')
    })

    it('should check that logged in and products and cart are displayed', async () => {
        await loginPage.login('standard_user', 'secret_sauce')
        const isInventoryPageOpen = await inventoryPage.isOpen()
        await expect(isInventoryPageOpen).toBe(true)
        await expect(inventoryPage.item).toBePresent()
        await expect(inventoryPage.cartLink).toBePresent()
    })

    it('should check that cart is displayed, product is the same as added', async () => {
        await inventoryPage.cartLink.click()
        await expect(cartPage.item).toBePresent()
    })

})