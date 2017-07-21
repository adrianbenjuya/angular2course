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

	heroes: Hero[];
	searchText: string;
	auxHeroes: Hero[];

	start: number = 0;
	orderby: string = 'id';
	orderdir: string = 'asc';

	constructor(
		private router: Router,
		private heroService: HeroService) { }

	getHeroes(): void {
		this.heroes = undefined;

		this.heroService.getHeroes(this.start, this.orderby, this.orderdir).subscribe(
			(heroes: Hero[]) => {
				this.heroes = heroes;
				this.auxHeroes = this.heroes.slice();
			}
		);
	}

	ngOnInit(): void {
		this.getHeroes();
	}

	search(searchText: string): void {
		this.searchText = searchText;
		if (searchText && searchText.length) {
			this.heroes = this.auxHeroes.filter(
				(hero: Hero) => hero.name.toLocaleLowerCase().trim().includes(searchText.toLocaleLowerCase().trim())
			);
		}
		else {
			this.heroes = this.auxHeroes;
		}
	}

	vote(hero: Hero): void {
		this.heroService.vote(hero)
			.subscribe(
			(response: any) => this.getHeroes()
			);
	}


	deleteHero(hero: Hero): void {
		// Si deseamos podemos eliminarlo instantáneamente para una mejor experiencia de usuario
		// El problema acá es que si sucede un error en el server durante el delete tendremos que 
		// reincorporar al héroe a nuestro arreglo. Otra solución es no eliminarlo del arreglo y
		// poner un loading en alguna parte mientras se elimina en el server, de esta forma si ocurre
		// un error entonces solo se muestra un mensaje pero el héroe no va a desaparecer y luego reaparecer
		let heroIndex: number = this.heroes.indexOf(hero);
		this.heroes.splice(heroIndex, 1);

		this.heroService
			.delete(hero.id)
			.subscribe(
			(res: any) => {
				this.getHeroes();
			}
			);
	}

	changePage(page: number): void {
		this.heroService.currentPage = page;
		this.heroes = null;
		this.start = this.heroService.offset * (page - 1);
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

	get pageCount(): number {
		return Math.ceil(this.heroService.heroesAmount / this.heroService.offset);
	}
}
