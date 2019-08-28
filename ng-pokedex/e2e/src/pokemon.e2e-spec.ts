import { PokemonPage } from './pokemon.po';
import { browser } from 'protractor';

function sleep() {
  browser.driver.sleep(1500); // sleep for demonstration reasons
}

describe('ng-pokedex pokemon view', () => {
  let page: PokemonPage;

  beforeEach(() => {
    page = new PokemonPage();
  });

  it('should display a list of pokemon', async () => {
    await page.navigateTo();
    const numberOfPokemon = await page.getPokemonCardElements().count()
    expect(numberOfPokemon).toBe(151);
  });

  it('should open and view a particular pokemon', async () => {
    await page.navigateTo();
    await page.getFirstPokemonCardElement().click();

    expect(await page.getOpenModalElement()).toBeTruthy();
    expect(await page.getOpenModalHeadingElement().getText()).toBe('Bulbasaur #1');
  });

  it('should open and allow arrow keys to navigate between pokemon', async () => {
    await page.navigateTo();
    await page.getFirstPokemonCardElement().click();
    await page.selectNextKey();

    expect(await page.getOpenModalHeadingElement().getText()).toBe('Ivysaur #2');

    await page.selectPrevKey();
    await page.selectPrevKey();
    expect(await page.getOpenModalHeadingElement().getText()).toBe('Mew #151');
  });
});
