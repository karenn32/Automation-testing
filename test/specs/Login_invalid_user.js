import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import { generateRandomString } from '../../utils/random.js'



describe('Login invalid password test', () => {
    it('should check that password is secured', async () => {
        await LoginPage.open()
        await expect(LoginPage.inputPassword).toHaveAttribute('type', 'password')
        //await browser.pause(2000)
    })

    it('should check that "X" icons are displayed', async () => {
        const randomLogin = generateRandomString(10);
        await LoginPage.login(randomLogin, 'secret_sauce')
        await expect(LoginPage.loginErrorIcon).toBePresent()
        await expect(LoginPage.loginErrorText).toBePresent()
    })
})