import { Builder } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome.js'

export async function criarDriver() {
  const options = new chrome.Options()
  // options.addArguments('--headless=new')

  return await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build()
}

export const BASE_URL = 'http://localhost:5173'