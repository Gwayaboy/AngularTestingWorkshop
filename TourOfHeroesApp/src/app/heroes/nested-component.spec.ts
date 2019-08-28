import { TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";

describe('Nested Components', () => {
    it('Stub Components', () => {
        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                HeroStubComponent
            ],
            providers: [{ provide: HeroService, useValue: undefined }]
        });
        const fixture = TestBed.createComponent(HeroesComponent);
        const component = fixture.componentInstance;
        expect(component).toBeDefined();
    });

    it('NO_ERRORS_SCHEMA', () => {
        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent
            ],
            providers: [{ provide: HeroService, useValue: undefined }],
            schemas: [ NO_ERRORS_SCHEMA ]
        });
        const fixture = TestBed.createComponent(HeroesComponent);
        const component = fixture.componentInstance;
        expect(component).toBeDefined();
    });
});

@Component({ selector: 'app-hero', template: '' })
class HeroStubComponent {
    @Input() hero: Hero;
}