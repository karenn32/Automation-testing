
import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'

describe('Logout test', () => {
    it('should check that burger is present', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await expect(InventoryPage.burger).toBePresent()
    })

    it('should check that 4 items in sidebar are present', async () => {
        await InventoryPage.burger.click()
        await browser.pause(1000)
        await expect(InventoryPage.allItemsBtn).toBePresent()
        await expect(InventoryPage.about).toBePresent()
        await expect(InventoryPage.logout).toBePresent()
        await expect(InventoryPage.reset).toBePresent()
    })

    it('should check that user is redirected and fields are empty', async () => {
        await InventoryPage.logout.click()
        await expect(LoginPage.inputUsername).toHaveValue('')
        await expect(LoginPage.inputPassword).toHaveValue('')
    })
})