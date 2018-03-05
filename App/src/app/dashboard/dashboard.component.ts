import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '../models/hero';
import { HeroService } from '../hero.service';

@Component({
    selector: 'my-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(
        private heroService: HeroService
    ) {}

    heroes: Hero[];
    heroesTop: Hero[];
    currentHero: Hero;
    allowVotes: Boolean = true;

    ngOnInit(): void {
        this.heroService.getHeroes().subscribe(
            heroes => {
                this.heroes = heroes;
                console.log(this.heroes);
                this.orderHeroes();
            }
        )
    }
    
    orderHeroes(): void{
        this.heroes.sort((a, b) => {
            if (a.votes < b.votes) return 1;
            else if (a.votes > b.votes) return -1;
            else if (a.name < b.name) return -1;
            else if (a.name > b.name) return 1;
            else return 0;
        });
        this.heroesTop = this.heroes.slice(0,3);
    }
}
