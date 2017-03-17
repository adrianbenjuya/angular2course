import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '../models/hero';
import { HeroService } from '../hero.service';

@Component({
    selector: 'my-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    heroes: Hero[];

    //Ejercicios: 1
    hero: Hero;

    constructor(private router: Router,
        private heroService: HeroService) {
    }

    ngOnInit(): void {

        //Ejercicios: 1
        this.hero = new Hero();
        this.hero.id = 1;
        this.hero.name = "Batman";
        this.hero.votes = 5;

        this.heroService.getHeroes().subscribe(
            heroes => {
                if (heroes) {
                    this.heroes = heroes.sort((a, b) => {
                        if (a.votes < b.votes) return 1;
                        else if (a.votes > b.votes) return -1;
                        else return 0;
                    }).slice(0, 3);
                }
            }
        )
    }

    gotoDetail(hero: Hero): void {
        let link = ['/detail', hero.id];
        this.router.navigate(link);
    }

    //Ejercicio 3
    updateVotes(votes: number) : void {
        this.hero.votes += votes;
    }

    // Ejercicio 5
    get heroName(): string {
        return this.hero.name;
    }

    // Ejercicio 5
    set heroName(value: string) {
        this.hero.name = value;
    }
}
