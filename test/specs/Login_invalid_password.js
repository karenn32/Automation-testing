
import loginPage from '../pageobjects/login.page.js'
import { generateRandomString } from '../../utils/random.js'



describe('Login invalid password test', () => {
    it('should check that password is secured', async () => {
        await loginPage.open()
        //await browser.pause(2000)
        await expect(loginPage.inputPassword).toHaveAttribute('type', 'password')
    })

    it('should check that "X" icons are displayed', async () => {
        const randomPassword = generateRandomString(10);
        await loginPage.login('standard_user', randomPassword)
        await expect(loginPage.loginErrorIcon).toBePresent()
        await expect(loginPage.loginErrorText).toBePresent()
    })
})