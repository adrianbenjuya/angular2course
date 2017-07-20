import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from "app/models/hero";

@Component({
	selector: 'hero-tile',
	templateUrl: './hero-tile.component.html',
	styleUrls: ['./hero-tile.component.css']
})
export class HeroTileComponent implements OnInit {

	@Input() hero: Hero;
	@Input() first: boolean;
	@Input() last: boolean;
	@Input() allowVotes: boolean = true;

	@Output() onHeroVotesChanged: EventEmitter<number> = new EventEmitter<number>();

	constructor() { }

	ngOnInit() {
	}

	updateVotes(event: MouseEvent, votes: number) : void {
		event.stopPropagation();
	    this.hero.votes += votes;

	    this.onHeroVotesChanged.emit(this.hero.votes);
	}

}
