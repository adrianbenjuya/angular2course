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

    // Ejercicios: 9 en adelante
    heroes: Hero[];

    //Ejercicios: 1 en adelante
    hero: Hero;

    //Ejercicios: 8
    allowVotes: boolean = false;

    //Ejercicio: 12
    selectedHero: Hero;

    constructor(private router: Router,
                private heroService: HeroService) {
    }

    ngOnInit(): void {

        //Ejercicios: 1 en adelante
        // this.hero = new Hero();
        // this.hero.id = 1;
        // this.hero.name = "Batman";
        // this.hero.votes = 5;
        // this.hero.description = 'Batman is a fictional superhero appearing in American comic books published by DC Comics. The character was created by artist Bob Kane and writer Bill Finger, and first appeared in Detective Comics #27 (1939). Originally named the "Bat-Man", the character is also referred to by such epithets as the Caped Crusader, the Dark Knight, and the World\'s Greatest Detective';

        //Ejercicios: 9 en adelante
        // this.heroes = new Array<Hero>();

        // let hero2 = new Hero();
        // hero2.id = 2;
        // hero2.name = "Superman";
        // hero2.votes = 3;
        // hero2.description = 'Superman is a fictional superhero appearing in American comic books published by DC Comics. The character was created by writer Jerry Siegel and artist Joe Shuster, high school students living in Cleveland, Ohio, in 1933. They sold Superman to Detective Comics, the future DC Comics, in 1938. Superman debuted in Action Comics #1 (cover-dated June 1938) and subsequently appeared in various radio serials, newspaper strips, television programs, films, and video games. With this success, Superman helped to create the superhero archetype and establish its primacy within the American comic book. The character is also referred to by such epithets as the Man of Steel, the Man of Tomorrow, and The Last Son of Krypton.'

        // let hero3 = new Hero();
        // hero3.id = 3;
        // hero3.name = "Wonder Woman";
        // hero3.votes = 7;
        // hero3.description = 'Wonder Woman is a fictional superheroine appearing in American comic books published by DC Comics. The character is said to be a founding member of the Justice League, demigoddess, and warrior princess of the Amazonian people. In her homeland, she is Princess Diana of Themyscira, and outside of her homeland, she is known by her civilian identity Diana Prince.';

        // this.heroes.push(this.hero, hero2, hero3);

        // Ejercicio: 10
        //this.orderHeroes()

        // Ejercicio: 13
        this.heroService.getHeroes().subscribe(
            heroes => {
                this.heroes = heroes;
                this.orderHeroes(3);
            }
        )
    }

    gotoDetail(hero: Hero): void {
        // Enfoque A
        this.router.navigate(['/detail', hero.id]);

        // Enfoque B
        //this.router.navigate(['/detail', { id: hero.id }]);
    }

    //Ejercicio 3
    updateVotes(votes: number) : void {
        this.hero.votes += votes;

        //Descomentar para reordenar
        //this.orderHeroes();
    }

    orderHeroes(slice?: number): void {
        let heroes: Hero[] = this.heroes.sort((a, b) => {
                                if (a.votes < b.votes) return 1;
                                else if (a.votes > b.votes) return -1;
                                else if (a.name < b.name) return -1;
                                else if (a.name > b.name) return 1;
                                else return 0;
                            });

        if (slice) {
            this.heroes = heroes.slice(0, slice);
        }
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
