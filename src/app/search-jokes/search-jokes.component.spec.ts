import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { SearchJokesComponent } from './search-jokes.component';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from '../app.service';

describe('SearchJokesComponent', () => {
  let component: SearchJokesComponent;
  let fixture: ComponentFixture<SearchJokesComponent>;
  let service: AppService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchJokesComponent],
      imports: [HttpClientModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SearchJokesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign input value to search string', () => {
    spyOn(component, 'getSearchString').and.callThrough();
    const event = {
      target: {
        value: 'test'
      }
    }
    component.getSearchString(event);
    expect(component.searchString).toEqual('test');
  });

  describe('Search jokes', () => {
    beforeEach(async () => {
      service = TestBed.inject(AppService);
    });
    it('should get search results propeely', () => {
      spyOn(component, 'searchJokes').and.callThrough();
      spyOn(service, 'getJokesListBySearch').and.returnValue(of([
        {
          id: '1',
          joke: 'test joke'
        },
        {
          id: '1',
          joke: 'test joke'
        }
      ]));
      component.searchString = 'test';
      component.listOfJokes = [];
      component.searchJokes();
      expect(component.jokesLoading).toBeFalsy();
    });

    it('should get search results propeely', () => {
      spyOn(component, 'searchJokes').and.callThrough();
      spyOn(service, 'getJokesListBySearch').and.returnValue(throwError(() => new Error()))
      component.searchString = 'test';
      component.listOfJokes = [];
      component.searchJokes();
    });
  })
});
