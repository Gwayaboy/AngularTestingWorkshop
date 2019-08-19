import { MessageService } from './message.service';
import { HeroService } from './hero.service';
import { Hero } from './hero';
import { defer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { fakeAsync, tick } from '@angular/core/testing';

let httpClientSpy: { get: jasmine.Spy };
let fakeMessageService;
let heroService: HeroService;

function asyncData(data) {
  return defer(() => Promise.resolve(data));
}

function asyncError(error) {
  return defer(() => Promise.reject(error));
}


beforeEach(() => {
  // TODO: spy on other methods too
  httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  fakeMessageService = jasmine.createSpyObj(['add']);
  heroService = new HeroService(<any> httpClientSpy, fakeMessageService);
});

it('should get hero by id', fakeAsync(() => {
  // Arrange
  const expectedHero =  { id: 2, name: 'B', strength: 8 } as Hero;
  httpClientSpy.get.and.returnValue(asyncData(expectedHero));
  let hero: Hero;
  // Act
  heroService.getHero(2).subscribe((data) => hero = data);
  tick();
  // Assert
  expect(hero).toBe(expectedHero);

}));

xit('should return expected heroes (HttpClient called once)', () => {
  const expectedHeroes: Hero[] =
    [{ id: 1, name: 'A', strength: 9 }, { id: 2, name: 'B', strength: 8 }];

  httpClientSpy.get.and.returnValue(asyncData(expectedHeroes));

  heroService.getHeroes().subscribe(
    heroes => expect(heroes).toEqual(expectedHeroes, 'expected heroes'),
    fail
  );
  expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
});

xit('should return an error when the server returns a 404', () => {
  const errorResponse = new HttpErrorResponse({
    error: 'test 404 error',
    status: 404, statusText: 'Not Found'
  });

  httpClientSpy.get.and.returnValue(asyncError(errorResponse));

  heroService.getHeroes().subscribe(
    heroes => fail('expected an error, not heroes'),
    error  => expect(error.message).toContain('test 404 error')
  );
});

