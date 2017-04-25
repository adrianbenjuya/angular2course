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

  // Ejercicio 15, Enfoque 1
  heroes: Hero[];

  // Ejercicio 15, Enfoque 2
  //heroes: Observable<Hero[]>;

  // Ejercicio 17
  //auxHeroes: Hero[];

  //start: number = 0;
  //orderby: string = 'id';
  //orderdir: string = 'asc';

  constructor(
    private router: Router,
    private heroService: HeroService) { }

  getHeroes(): void {

    // Ejercicio 15, Enfoque 1
    this.heroService.getHeroes().subscribe(
      (heroes: Hero[]) => {
        this.heroes = heroes;

        // Ejercicio 17
        //this.auxHeroes = this.heroes.slice();
      }
    );
    
    // Ejercicio 24
    // this.heroService.getHeroes(this.start, this.orderby, this.orderdir).subscribe(
    //   (heroes: Hero[]) => {
    //     this.heroes = heroes;
    //     this.auxHeroes = this.heroes.slice();
    //   }
    // );

    // Ejercicio 15, Enfoque 2
    //this.heroes = this.heroService.getHeroes();
  }

  ngOnInit(): void {
    // Ejercicio 24
    //this.start = (this.heroService.currentPage - 1) * this.heroService.offset;

    this.getHeroes();
  }

  
  // Ejercicio 17
  // search(searchString: string) : void {
  //   if (searchString && searchString.length) {
  //     this.heroes = this.auxHeroes.filter(
  //       (hero: Hero) => hero.name.toLocaleLowerCase().trim().includes(searchString.toLocaleLowerCase().trim())
  //     );
  //   }
  //   else {
  //     this.heroes = this.auxHeroes;
  //   }
  // }

  // Ejercicio 18
  // vote(hero: Hero): void {
  //   this.heroService.vote(hero)
  //   .subscribe(
  //     (response: any) => this.getHeroes()
  //   );
  // }

  // Ejercicio 19
  // deleteHero(hero: Hero): void {

  //   // Si deseamos podemos eliminarlo instantáneamente para una mejor experiencia de usuario
  //   // El problema acá es que si sucede un error en el server durante el delete tendremos que 
  //   // reincorporar al héroe a nuestro arreglo. Otra solución es no eliminarlo del arreglo y
  //   // poner un loading en alguna parte mientras se elimina en el server, de esta forma si ocurre
  //   // un error entonces solo se muestra un mensaje pero el héroe no va a desaparecer y luego reaparecer
  //   let heroIndex: number = this.heroes.indexOf(hero);
  //   this.heroes.splice(heroIndex, 1);

  //   this.heroService
  //     .delete(hero.id)
  //     .subscribe(
  //       (res: any) => {
  //         this.getHeroes();
  //       }
  //     );
  // }

  // Ejercicio 21
  // gotoDetail(e: any, hero: Hero): void {
  //   e.preventDefault();
  //   // Enfoque A
  //   this.router.navigate(['/detail', hero.id]);

  //   // Enfoque B
  //   //this.router.navigate(['/detail', { id: hero.id }]);
  // }

  // Ejercicio 24
  // nextPage(): void {
  //   this.heroService.currentPage++;
  //   this.heroes = null;
  //   this.start += this.heroService.offset;
  //   this.getHeroes();
  // }

  // Ejercicio 24
  // previousPage(): void {
  //   this.heroService.currentPage--;
  //   this.heroes = null;
  //   this.start -= this.heroService.offset;
  //   this.getHeroes();
  // }

  // Ejercicio 24
  // orderBy(e: MouseEvent, by: string) {
  //   e.preventDefault();
  //   this.orderby = (by && by.length) ? by : 'id';
  //   this.orderdir = this.orderdir === 'asc' ? 'desc' : 'asc';
  //   this.heroService.currentPage = 1;
  //   this.start = 0;

  //   this.getHeroes()
  // }

  // Ejercicio 24
  // get currentPage(): number {
  //   return this.heroService.currentPage;
  // }

  // Ejercicio 24
  // get offset(): number {
  //   return this.heroService.offset;
  // }

  // Ejercicio 24
  // get heroesAmount(): number {
  //   return this.heroService.heroesAmount;
  // }
}
