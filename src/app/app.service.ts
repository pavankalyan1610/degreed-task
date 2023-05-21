import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    "Accept": "application/json"
  });
  getRandomJoke() {
    // const headers = new HttpHeaders({
    //   "Accept":"application/json"
    // });
    return this.http.get('https://icanhazdadjoke.com/', { headers: this.headers });
  }

  getJokesListBySearch(searchTerm: string) {
    const params = {
      "current_page": 1,
      "limit": 30,
      "next_page": 2,
      "previous_page": 1,
      "term": searchTerm
    }
    return this.http.get('https://icanhazdadjoke.com/search', { headers: this.headers, params: params });
  }

}
