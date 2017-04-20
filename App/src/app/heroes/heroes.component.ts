import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '../models/hero';
import { HeroService } from '../hero.service';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  // Enfoque 1
  heroes: Hero[];

  // Enfoque 2
  //heroes: Observable<Hero[]>;

  auxHeroes: Hero[];
  error: any;
  start: number = 0;
  readonly offset: number = 5;

  constructor(
    private router: Router,
    private heroService: HeroService) { }

  getHeroes(): void {
    // Enfoque 1
    this.heroService.getHeroes(this.start, this.offset).subscribe(
      (heroes: Hero[]) => {
        this.heroes = heroes;
        this.auxHeroes = this.heroes.slice();
      }
    );

    // Enfoque 2
    //this.heroes = this.heroService.getHeroes();
  }

  deleteHero(hero: Hero, event: any): void {
    event.stopPropagation();
    this.heroService
      .delete(hero.id)
      .subscribe(
        (res: any) => {
          this.getHeroes();
        }, 
        (error: any) => this.error = error
      );
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  vote(hero: Hero): void {
    this.heroService.vote(hero)
    .subscribe(
      (response: any) => this.getHeroes()
    );
  }

  search(searchString: string) : void {
    if (searchString && searchString.length) {
      this.heroes = this.auxHeroes.filter(
        (hero: Hero) => hero.name.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())
      );
    }
    else {
      this.heroes = this.auxHeroes;
    }
  }

  nextPage(): void {
    this.start += this.offset;
    this.getHeroes();
  }

  previousPage(): void {
    this.start -= this.offset;
    this.getHeroes();
  }
}
