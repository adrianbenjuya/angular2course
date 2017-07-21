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
    allowVotes: boolean = true;

    constructor(private router: Router,
                private heroService: HeroService) {
    }

    ngOnInit(): void {
        this.heroService.getHeroes().subscribe(
            heroes => {
                this.heroes = heroes.slice(0, 3);
                this.orderHeroes();
            }
        )
    }

    orderHeroes(): void {
        this.heroes.sort((a, b) => {
            if (a.votes < b.votes) return 1;
            else if (a.votes > b.votes) return -1;
            else if (a.name < b.name) return -1;
            else if (a.name > b.name) return 1;
            else return 0;
        });
    }
}
