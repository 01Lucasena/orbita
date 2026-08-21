import { By, until } from 'selenium-webdriver'
import { expect } from 'chai'
import { criarDriver, BASE_URL } from './helpers/driver.js'

async function fazerLogin(driver) {
  await driver.get(`${BASE_URL}/login`)
  await driver.findElement(By.css('input[type="email"], input[type="text"]')).sendKeys('teste@teste.com')
  await driver.findElement(By.css('input[type="password"]')).sendKeys('senha123456')
  await driver.findElement(By.css('form button:not([type="button"])')).click()
  await driver.wait(until.urlContains('/feed'), 10000)
}

describe('Perfil', function () {
  this.timeout(20000)
  let driver

  beforeEach(async function () {
    driver = await criarDriver()
    await fazerLogin(driver)
  })

  afterEach(async function () {
    await driver.quit()
  })

  it('deve navegar até o próprio perfil pelo menu', async function () {
    const avatarButton = await driver.findElement(By.css('[class*="trigger"]'))
    await avatarButton.click()

    const linkPerfil = await driver.wait(
      until.elementLocated(By.xpath("//a[contains(text(), 'Ver perfil')]")),
      5000
    )
    await linkPerfil.click()

    await driver.wait(until.urlContains('/perfil/'), 10000)

    const urlAtual = await driver.getCurrentUrl()
    expect(urlAtual).to.include('/perfil/')
  })

  it('deve exibir o botão de editar perfil no próprio perfil', async function () {
    const avatarButton = await driver.findElement(By.css('[class*="trigger"]'))
    await avatarButton.click()
    const linkPerfil = await driver.wait(until.elementLocated(By.xpath("//a[contains(text(), 'Ver perfil')]")), 5000)
    await linkPerfil.click()
    await driver.wait(until.urlContains('/perfil/'), 10000)

    const botaoEditar = await driver.wait(
      until.elementLocated(By.xpath("//a[contains(text(), 'Editar perfil')]")),
      8000
    )
    expect(await botaoEditar.isDisplayed()).to.be.true
  })
})