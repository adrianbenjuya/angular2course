import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { AppConfig } from './app.config';
import { Observable } from 'rxjs/Rx';

import { Hero } from './hero';

@Injectable()
export class HeroService {
  private heroesUrl = 'app/heroes';  // URL to web api
  private jsonHeader = new Headers({
      'Content-Type': 'application/json'
  });

  constructor(private http: Http) { }

  getHeroes(): Observable<Hero[]> {
    return this.http
      .get(AppConfig.HEROES_URL)
      .map(response => response.json())
      .map(response => Hero.fromJsonArray(response))
      .catch(this.handleError);
  }

  getHero(id: number): Observable<Hero> {
    return this.http.get(`${AppConfig.HEROES_URL}get/${id}`)
      .map(response => response.json())
      .map(response => Hero.fromJson(response));
  }

  save(hero: Hero): Promise<Hero> {
    if (hero.id) {
      return this.put(hero);
    }
    return this.post(hero);
  }

  delete(heroId: number): Observable<Response> {

    let url = `${AppConfig.HEROES_URL}${heroId}`;

    return this.http
      .delete(url, {headers: this.jsonHeader})
      .catch(this.handleError);
  }

  // Add new Hero
  private post(hero: Hero): Promise<Hero> {

    return this.http
      .post(this.heroesUrl, JSON.stringify(hero), { headers: this.jsonHeader })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  // Update existing Hero
  private put(hero: Hero): Promise<Hero> {

    let url = `${this.heroesUrl}/${hero.id}`;

    return this.http
      .put(url, JSON.stringify(hero), { headers: this.jsonHeader })
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
