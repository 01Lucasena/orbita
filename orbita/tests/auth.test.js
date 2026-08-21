import { By, until } from 'selenium-webdriver'
import { expect } from 'chai'
import { criarDriver, BASE_URL } from './helpers/driver.js'

describe('Autenticação', function () {
  this.timeout(20000)
  let driver

  beforeEach(async function () {
    driver = await criarDriver()
  })

  afterEach(async function () {
    await driver.quit()
  })

  it('deve fazer login com credenciais válidas e redirecionar pro feed', async function () {
    await driver.get(`${BASE_URL}/login`)

    const emailInput = await driver.findElement(By.css('input[type="email"], input[type="text"]'))
    const senhaInput = await driver.findElement(By.css('input[type="password"]'))

    await emailInput.sendKeys('teste@teste.com')
    await senhaInput.sendKeys('senha123456')

    const botaoLogin = await driver.findElement(By.css('form button:not([type="button"])'))
    await botaoLogin.click()

    await driver.wait(until.urlContains('/feed'), 10000)

    const urlAtual = await driver.getCurrentUrl()
    expect(urlAtual).to.include('/feed')
  })

  it('deve mostrar erro ao tentar login com senha incorreta', async function () {
    await driver.get(`${BASE_URL}/login`)

    const emailInput = await driver.findElement(By.css('input[type="email"], input[type="text"]'))
    const senhaInput = await driver.findElement(By.css('input[type="password"]'))

    await emailInput.sendKeys('teste@teste.com')
    await senhaInput.sendKeys('senhaErrada123')

    const botaoLogin = await driver.findElement(By.css('form button:not([type="button"])'))
    await botaoLogin.click()

    await driver.wait(until.elementLocated(By.css('[class*="error"]')), 8000)

    const urlAtual = await driver.getCurrentUrl()
    expect(urlAtual).to.include('/login')
  })
})