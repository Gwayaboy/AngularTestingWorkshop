import { browser, element, by, Key } from 'protractor';

export class PokemonPage {
  navigateTo() {
    return browser.get('/pokemon');
  }

  getPokemonCardElements() {
    return element.all(by.css('.card--media'));
  }

  getFirstPokemonCardElement() {
    return element(by.css('.card--media'));
  }

  getOpenModalElement() {
    return element(by.tagName('ngx-modal'));
  }

  getOpenModalHeadingElement() {
    return element(by.css('ngx-modal h1'));
  }

  async selectNextKey() {
    await browser.actions().sendKeys(Key.ARROW_RIGHT).perform();
  }

  async selectPrevKey() {
    await browser.actions().sendKeys(Key.ARROW_LEFT).perform();
  }

  async selectEscapeKey() {
    await browser.actions().sendKeys(Key.ESCAPE).perform();
  }
}
