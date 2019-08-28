import { TestBed, fakeAsync, tick, ComponentFixture } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { Component, Input } from "@angular/core";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { defer, of } from "rxjs";

describe('Heroes Component', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let component: HeroesComponent;
    let heroesHtmlElement: HTMLElement;

    beforeEach(() => {
        const heroServiceSpy = jasmine.createSpyObj<HeroService>('HeroService', ['getHeroes', 'addHero']);
        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                HeroStubComponent
            ],
            providers: [{ provide: HeroService, useValue: heroServiceSpy }]
        });

        fixture = TestBed.createComponent(HeroesComponent);
        component = fixture.componentInstance;
        heroesHtmlElement = fixture.nativeElement;
    });

    it('should display HeroComponents after initialising', fakeAsync(() => {
        // Arrange
        const heroes: Hero[] = [
            { id: 1, name: 'TEST HERO ONE', strength: 0 },
            { id: 2, name: 'TEST HERO TWO', strength: 0 },
            { id: 3, name: 'TEST HERO THREE', strength: 0 },
        ];
        const heroServiceSpy = TestBed.get(HeroService);
        heroServiceSpy.getHeroes.and.returnValue(defer(() => of(heroes)));

        // Act
        component.ngOnInit();
        tick();
        fixture.detectChanges();

        // Assert
        const heroElements = heroesHtmlElement.querySelectorAll('div.hero');
        expect(heroElements.length).toBe(3);
    }));

    it('should add hero after typing hero name and clicking add button', fakeAsync(() => {
        // Arrange
        const hero = { id: 1, name: 'TEST HERO', strength: 0 } as Hero

        const heroServiceSpy: jasmine.SpyObj<HeroService> = TestBed.get(HeroService);
        heroServiceSpy.getHeroes.and.returnValue(defer(() => of([])));
        heroServiceSpy.addHero.and.returnValue(defer(() => of(hero)));

        component.ngOnInit();
        tick();
        fixture.detectChanges();

        // Act
        const input: HTMLInputElement = heroesHtmlElement.querySelector('input');
        input.value = hero.name;

        const addButton: HTMLButtonElement = heroesHtmlElement.querySelector('button');
        addButton.click();
        tick();
        fixture.detectChanges();

        // Assert
        const heroElement: HTMLElement = heroesHtmlElement.querySelector('div.hero');
        expect(heroElement.textContent).toBe(hero.name);
    }));
});

@Component({ selector: 'app-hero', template: '<div class="hero">{{hero.name}}</div>' })
class HeroStubComponent {
    @Input() hero: Hero;
}

