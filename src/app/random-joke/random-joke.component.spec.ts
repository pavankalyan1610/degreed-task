import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { RandomJokeComponent } from './random-joke.component';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from '../app.service';

describe('RandomJokeComponent', () => {
  let component: RandomJokeComponent;
  let fixture: ComponentFixture<RandomJokeComponent>;
  let service: AppService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RandomJokeComponent],
      imports: [HttpClientModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RandomJokeComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AppService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get random joke properly',()=>{
    spyOn(component,'fetchRadomJoke').and.callThrough();
    spyOn(service,'getRandomJoke').and.returnValue(of({
      id:'1',
      joke:'test'
    }));
    component.fetchRadomJoke();
    expect(component.jokeLoading).toBeFalsy();
  });

  it('should get search results propeely', () => {
    spyOn(component, 'fetchRadomJoke').and.callThrough();
    spyOn(service, 'getRandomJoke').and.returnValue(throwError(() => new Error()))
    component.fetchRadomJoke();
    expect(component.jokeLoading).toBeFalsy();
  });

});
