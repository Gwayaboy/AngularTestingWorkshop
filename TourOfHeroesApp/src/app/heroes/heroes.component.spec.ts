import { HeroService } from './../hero.service';
import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs';
import { Hero } from '../hero';

describe('HeroesComponent', () => {

  let component: HeroesComponent;
  let  HEROES;

  beforeEach(() => {
    HEROES = [
      {id: 1, name: 'SpiderDude', strength: 8},
      {id: 2, name: 'Wonderful Woman', strength: 24},
      {id: 3, name: 'SuperDude', strength: 55}
    ];
  });

  it('should initialise heroes from HeroService ', () => {
    // Arrange
    component = new HeroesComponent({ getHeroes: () => of(HEROES) } as HeroService);

    // Act
    component.getHeroes();

    // Assert
    expect(component.heroes).toBe(HEROES);
  });

  it('should add new hero "AngularHero" with default strength 11 ', () => {
    // Arrange
    component = new HeroesComponent({ addHero: (hero: Hero) => of(hero) } as HeroService);
    component.heroes = [];

    // Act
    component.add('AngularHero');

    // Assert
    expect(component.heroes[0]).toEqual({name:'AngularHero', strength: 11} as Hero);
  });

  it('should call addHero on heroes service', () => {
    // Arrange
    const fakeHeroService = jasmine.createSpyObj(['addHero']);
    fakeHeroService.addHero.and.returnValue(of(true));
    component = new HeroesComponent(fakeHeroService);

    // Act
    component.add('AngularHero');

    // Assert
    expect(fakeHeroService.addHero).toHaveBeenCalledWith({name:'AngularHero', strength:11});
  });

});
