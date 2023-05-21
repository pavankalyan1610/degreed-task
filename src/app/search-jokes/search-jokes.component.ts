import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-jokes',
  templateUrl: './search-jokes.component.html',
  styleUrls: ['./search-jokes.component.scss']
})
export class SearchJokesComponent implements OnInit {

  constructor(private appService: AppService) { }
  numberOfJoke = 0;
  searchString = '';
  listOfJokes: any = [];
  jokesLoading = false;
  subscription: Subscription = new Subscription();
  ngOnInit() {
    this.searchJokes();
  }

  getSearchString(event: any) {
    this.searchString = event.target.value;
  }

  searchJokes() {
    this.jokesLoading = true;
    this.subscription.add(this.appService.getJokesListBySearch(this.searchString).subscribe((data: any) => {
      this.listOfJokes = data?.results;
      this.listOfJokes?.sort((a: any, b: any) => a?.joke?.length - b?.joke?.length)
      this.jokesLoading = false;
    }, () => {
      this.listOfJokes = [];
      this.jokesLoading == false;
    }));
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
