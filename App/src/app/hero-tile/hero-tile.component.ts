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
  
  @Output() onHeroVotesChanged:EventEmitter<number> = new EventEmitter<number>();

  showModal: boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

  
  voteHero(evt, mode){
    evt.stopPropagation();
    this.hero.votes += mode === "up" && this.hero.votes < 10 ? 1 : 0;
    this.hero.votes -= mode === "down" && this.hero.votes > 0 ? 1 : 0;
    this.onHeroVotesChanged.emit(this.hero.votes);
    this.hero.voting = mode;
    setTimeout( () => {
      this.hero.voting = "";
    }, 250);
  }


}
