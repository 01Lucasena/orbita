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

describe('Feed', function () {
  this.timeout(25000)
  let driver

  beforeEach(async function () {
    driver = await criarDriver()
    await fazerLogin(driver)
  })

  afterEach(async function () {
    await driver.quit()
  })

  it('deve criar um novo post e exibi-lo no feed', async function () {
    const textoUnico = `Post de teste automatizado - ${Date.now()}`

    const textarea = await driver.findElement(By.css('textarea'))
    await textarea.sendKeys(textoUnico)

    const botaoPostar = await driver.findElement(By.xpath("//button[contains(text(), 'Postar')]"))
    await botaoPostar.click()

    await driver.wait(until.elementLocated(By.xpath(`//p[contains(text(), '${textoUnico}')]`)), 10000)

    const postCriado = await driver.findElement(By.xpath(`//p[contains(text(), '${textoUnico}')]`))
    expect(await postCriado.isDisplayed()).to.be.true
  })

  it('deve curtir um post e incrementar o contador', async function () {
    await driver.wait(until.elementLocated(By.css('button[class*="actionButton"]')), 10000)
    const botoesCurtir = await driver.findElements(By.css('button[class*="actionButton"]'))
    const primeiroBotaoCurtir = botoesCurtir[0]

    const textoAntes = await primeiroBotaoCurtir.getText()

    await primeiroBotaoCurtir.click()
    await driver.sleep(1000)

    const textoDepois = await primeiroBotaoCurtir.getText()
    expect(textoDepois).to.not.equal(textoAntes)
  })
})