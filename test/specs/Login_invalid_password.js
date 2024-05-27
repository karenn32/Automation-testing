import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import { generateRandomString } from '../../utils/random.js'



describe('Login invalid password test', () => {
    it('should check that password is secured', async () => {
        await LoginPage.open()
        //await browser.pause(2000)
        await expect(LoginPage.inputPassword).toHaveAttribute('type', 'password')
    })

    it('should check that "X" icons are displayed', async () => {
        const randomPassword = generateRandomString(10);
        await LoginPage.login('standard_user', randomPassword)
        await expect(LoginPage.loginErrorIcon).toBePresent()
        await expect(LoginPage.loginErrorText).toBePresent()
    })
})