import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'

describe('Login valid user test', () => {
    it('should check that password is secured', async () => {
        await LoginPage.open()
        await expect(LoginPage.inputPassword).toHaveAttribute('type', 'password')
    })

    it('should check that user is logged in', async () => {
        await LoginPage.login('standard_user', 'secret_sauce')
        const isInventoryPageOpen = await InventoryPage.isOpen()
        await expect(isInventoryPageOpen).toBe(true)
        await expect(InventoryPage.item).toBePresent()
        await expect(InventoryPage.cartLink).toBePresent()
    })
})