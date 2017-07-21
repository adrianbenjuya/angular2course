import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/throw';

import { Hero } from './models/hero';
import { environment } from "environments/environment";

@Injectable()
export class HeroService {
    private jsonHeader = new Headers({
        'Content-Type': 'application/json'
    });

    public currentPage: number = 1;
    public heroesAmount: number;
    public readonly offset: number = 5;

    constructor(private http: Http) { }

    getHeroes(start?: number, orderby?: string, orderdir?: string): Observable<Hero[]> {
        let url: string = environment.api;
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
        return this.http.get(environment.api + 'get/' + id)
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

        let url = environment.api + 'Delete/' + heroId;

        return this.http
            .get(url, { headers: this.jsonHeader })
            .catch(this.handleError);
    }

    // Add new Hero
    private post(hero: Hero): Observable<Hero> {

        return this.http
            .post(environment.api, JSON.stringify(hero), { headers: this.jsonHeader })
            .map((r: Response) => Hero.fromJson(r))
            .catch(this.handleError);
    }

    // Update existing Hero
    private put(hero: Hero): Observable<Hero> {

        let url = environment.api + 'Edit/' + hero.id;

        return this.http
            .post(url, JSON.stringify(hero), { headers: this.jsonHeader })
            .map((r: Response) => Hero.fromJson(r))
            .catch(this.handleError);
    }

    vote(hero: Hero): Observable<any> {
        hero.votes++;
        hero.alreadyVoted = true;
        let url: string = environment.api + 'vote/' + hero.id;
        return this.http.get(url).catch(this.handleError);
    }

    private handleError(error: any): Observable<any> {
        console.error('An error occurred', error);
        return Observable.throw(error.message || error);
    }
}
