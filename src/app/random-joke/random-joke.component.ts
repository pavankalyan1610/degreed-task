import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-random-joke',
  templateUrl: './random-joke.component.html',
  styleUrls: ['./random-joke.component.scss']
})
export class RandomJokeComponent implements OnInit {

  constructor(private appService: AppService) { }
  randomJoke = '';
  jokeLoading = false;
  subscription: Subscription = new Subscription();
  ngOnInit() {
    this.fetchRadomJoke();
  }

  fetchRadomJoke() {
    this.jokeLoading = true;
    this.subscription.add(this.appService.getRandomJoke().subscribe((data: any) => {
      this.randomJoke = data?.joke;
      this.jokeLoading = false
    }, () => {
      this.randomJoke = 'Joke failed to load. Please refresh the page'
      this.jokeLoading = false;
    }));
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
