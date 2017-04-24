import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { AppConfig } from './app.config';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/delay';

import { Hero } from './models/hero';

@Injectable()
export class HeroService {
    private jsonHeader = new Headers({
        'Content-Type': 'application/json'
    });

    public currentPage: number = 1;
    public heroesAmount: number;
    public readonly offset: number = 3;

    constructor(private http: Http) { }

    getHeroes(start?: number, orderby?: string, orderdir?: string): Observable<Hero[]> {
        let url: string = AppConfig.HEROES_URL;
        if (start !== undefined && orderby !== undefined && orderdir !== undefined) {
            url += `?start=${start}&offset=${this.offset}&orderby=${orderby}&orderdir=${orderdir}`;
        }
        return this.http
            .get(url)
            .map(response => {
                let json = response.json();
                this.heroesAmount = json.total;
                return Hero.fromJsonArray(json.data);
            })
            .retryWhen((errors: Observable<any>) => errors.delay(2000))
            .catch(this.handleError);
    }

    getHero(id: number): Observable<Hero> {
        return this.http.get(AppConfig.HEROES_URL + 'get/' + id)
            .map(response => Hero.fromJson(response.json()))
            //.retryWhen((errors: Observable<any>) => errors.delay(2000))
            .catch(this.handleError);
    }

    save(hero: Hero): Observable<Hero> {
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
            .map((r: Response) => Hero.fromJson(r))
            .catch(this.handleError);
    }

    // Update existing Hero
    private put(hero: Hero): Observable<Hero> {

        let url = AppConfig.HEROES_URL + hero.id;

        return this.http
            .put(url, JSON.stringify(hero), { headers: this.jsonHeader })
            .map((r: Response) => Hero.fromJson(r))
            .catch(this.handleError);
    }

    vote(hero: Hero): Observable<any> {
        hero.votes++;
        hero.alreadyVoted = true;
        let url: string = AppConfig.HEROES_URL + 'vote/' + hero.id;
        return this.http.get(url).catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
