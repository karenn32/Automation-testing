
import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'

describe('Logout test', () => {
    it('should check that burger is present', async () => {
        await loginPage.open()
        await loginPage.login('standard_user', 'secret_sauce')
        await expect(inventoryPage.burger).toBePresent()
    })

    it('should check that 4 items in sidebar are present', async () => {
        await inventoryPage.burger.click()
        await browser.pause(1000)
        await expect(inventoryPage.allItemsBtn).toBePresent()
        await expect(inventoryPage.about).toBePresent()
        await expect(inventoryPage.logout).toBePresent()
        await expect(inventoryPage.reset).toBePresent()
    })

    it('should check that user is redirected and fields are empty', async () => {
        await inventoryPage.logout.click()
        await expect(loginPage.inputUsername).toHaveValue('')
        await expect(loginPage.inputPassword).toHaveValue('')
    })
})