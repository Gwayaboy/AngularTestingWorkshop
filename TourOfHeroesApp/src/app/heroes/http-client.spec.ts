import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { Hero } from '../hero';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

describe('HttpClient Testing Module', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let component: HeroesComponent;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        const messageServiceSpy = jasmine.createSpyObj<MessageService>('MessageService', ['add']);
        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                HeroStubComponent
            ],
            imports: [HttpClientTestingModule],
            providers: [
                HeroService,
                { provide: MessageService, useValue: messageServiceSpy }
            ]
        });

        fixture = TestBed.createComponent(HeroesComponent);
        component = fixture.componentInstance;
        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('component after initialising should have only called the heroes api once', () => {
        // Arrange

        // Act
        component.ngOnInit();

        // Assert
        httpTestingController.expectOne('api/heroes');
        httpTestingController.verify();
    });

    it('heroes should contain heroes recieved from the heroes api after the component initialises', fakeAsync(() => {
        // Arrange
        const heroes: Hero[] = [
            { id: 1, name: 'TEST HERO ONE', strength: 0 } as Hero,
            { id: 2, name: 'TEST HERO TWO', strength: 0 } as Hero
        ];

        // Act
        component.ngOnInit();
        const req = httpTestingController.expectOne('api/heroes');
        req.flush(heroes);
        tick();

        // Assert
        expect(component.heroes).toBe(heroes);
    }));

    it('heroes should be an empty array when the heroes api request results in an error', fakeAsync(() => {
        // Arrange
        component.heroes = [
            { id: 1, name: 'TEST HERO ONE', strength: 0 } as Hero,
            { id: 2, name: 'TEST HERO TWO', strength: 0 } as Hero
        ];

        // Act
        component.ngOnInit();
        const req = httpTestingController.expectOne('api/heroes');
        req.error(new ErrorEvent('Error'));
        tick();

        // Assert
        expect(component.heroes).toEqual([]);
    }));
});

@Component({ selector: 'app-hero', template: '' })
class HeroStubComponent {
    @Input() hero: Hero;
}