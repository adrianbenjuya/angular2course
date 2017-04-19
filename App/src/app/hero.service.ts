import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { AppConfig } from './app.config';
import { Observable } from 'rxjs/Rx';

import { Hero } from './models/hero';

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
            .map(response => Hero.fromJsonArray(response.json()))
            .catch(this.handleError);
    }

    getHero(id: number): Observable<Hero> {
        if (AppConfig.TEST_ENVIRONMENT) {
            return this.http.get(AppConfig.HEROES_URL)
            .map(r => Hero.fromJsonArray(r.json()).filter(h => h.id === id)[0]);
        }
        else {
            return this.http.get(AppConfig.HEROES_URL + 'get/' + id)
                .map(response => response.json())
                .map(response => Hero.fromJson(response));
        }
    }

    save(hero: Hero): Observable<any> {
        if (hero.id) {
            return this.put(hero);
        }
        return this.post(hero);
    }

    delete(heroId: number): Observable<Response> {

        let url = AppConfig.HEROES_URL + heroId;

        return this.http
            .delete(url, { headers: this.jsonHeader })
            .catch(this.handleError);
    }

    // Add new Hero
    private post(hero: Hero): Observable<Hero> {

        return this.http
            .post(AppConfig.HEROES_URL, JSON.stringify(hero), { headers: this.jsonHeader })
            .catch(this.handleError);
    }

    // Update existing Hero
    private put(hero: Hero): Observable<boolean> {

        let url = AppConfig.HEROES_URL + hero.id;

        return this.http
            .put(url, JSON.stringify(hero), { headers: this.jsonHeader })
            .catch(this.handleError);
    }

    vote(heroId: number): Observable<any> {
        let url: string = AppConfig.HEROES_URL + 'vote/' + heroId;
        return this.http.get(url).catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
