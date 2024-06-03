import loginPage from '../pageobjects/login.page.js'
import { generateRandomString } from '../../utils/random.js'



describe('Login invalid password test', () => {
    it('should check that password is secured', async () => {
        await loginPage.open()
        await expect(loginPage.inputPassword).toHaveAttribute('type', 'password')
        //await browser.pause(2000)
    })

    it('should check that "X" icons are displayed', async () => {
        const randomLogin = generateRandomString(10);
        await loginPage.login(randomLogin, 'secret_sauce')
        await expect(loginPage.loginErrorIcon).toBePresent()
        await expect(loginPage.loginErrorText).toBePresent()
    })
})