import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RandomJokeComponent } from './random-joke/random-joke.component';
import { SearchJokesComponent } from './search-jokes/search-jokes.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'random-joke',
    pathMatch:'full'
  },
  {
    path:'random-joke',
    component:RandomJokeComponent
  },
  {
    path:'serach-jokes',
    component:SearchJokesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
