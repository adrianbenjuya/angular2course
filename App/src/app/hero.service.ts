import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/throw';

import { Hero } from './models/hero';
import { environment } from 'environments/environment';

@Injectable()
export class HeroService {
    // private jsonHeader = new Headers({
    //     'Content-Type': 'application/json'
    // });

    public currentPage = 1;
    public heroesAmount: number;
    public readonly offset: number = 5;

    constructor(private http: HttpClient) { }

    getHeroes(start?: number, orderby?: string, orderdir?: string): Observable<Hero[]> {
        let url: string = environment.api;
        if (start !== undefined && orderby !== undefined && orderdir !== undefined) {
            url += `?start=${start}&offset=${this.offset}&orderby=${orderby}&orderdir=${orderdir}`;
        }
        return this.http
            .get<{ total: number, data: any }>(url)
            .map(r => {
                this.heroesAmount = r.total;
                return Hero.fromJsonArray(r.data);
            })
            .retryWhen((errors: Observable<any>) => errors.delay(2000))
            .catch(this.handleError);
    }

    getHero(id: number): Observable<Hero> {
        return this.http.get(environment.api + 'get/' + id)
            .map(response => Hero.fromJson(response))
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

        const url = environment.api + 'Delete/' + heroId;

        return this.http
            .get(url)
            .catch(this.handleError);
    }

    // Add new Hero
    private post(hero: Hero): Observable<Hero> {

        return this.http
            .post(environment.api, hero)
            .map(r => Hero.fromJson(r))
            .catch(this.handleError);
    }

    // Update existing Hero
    private put(hero: Hero): Observable<Hero> {

        const url = environment.api + 'Edit/' + hero.id;

        return this.http
            .post(url, hero)
            .map(r => Hero.fromJson(r))
            .catch(this.handleError);
    }

    vote(hero: Hero): Observable<any> {
        hero.votes++;
        hero.alreadyVoted = true;
        const url: string = environment.api + 'vote/' + hero.id;
        return this.http.get(url).catch(this.handleError);
    }

    private handleError(error: any): Observable<any> {
        console.error('An error occurred', error);
        return Observable.throw(error.message || error);
    }
}
