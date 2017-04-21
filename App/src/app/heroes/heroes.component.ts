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
  orderby: string = 'id';
  orderdir: string = 'asc';

  constructor(
    private router: Router,
    private heroService: HeroService) { }

  getHeroes(): void {
    // Enfoque 1
    this.heroService.getHeroes(this.start, this.orderby, this.orderdir).subscribe(
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
    this.start = (this.heroService.currentPage - 1) * this.heroService.offset;
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
    this.heroService.currentPage++;
    this.heroes.length = 0;
    this.start += this.heroService.offset;
    this.getHeroes();
  }

  previousPage(): void {
    this.heroService.currentPage--;
    this.heroes.length = 0;
    this.start -= this.heroService.offset;
    this.getHeroes();
  }

  orderBy(e: MouseEvent, by: string) {
    e.preventDefault();
    this.orderby = (by && by.length) ? by : 'id';
    this.orderdir = this.orderdir === 'asc' ? 'desc' : 'asc';
    this.heroService.currentPage = 1;
    this.start = 0;

    this.getHeroes()
  }
}
