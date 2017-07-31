import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from '../models/hero';

@Component({
  selector: 'hero-details-popup',
  templateUrl: './hero-details-popup.component.html',
  styleUrls: ['./hero-details-popup.component.css']
})
export class HeroDetailsPopupComponent implements OnInit {
    @Input() hero: Hero;

    @Output() closeModal:EventEmitter<Boolean> = new EventEmitter();

  constructor() { }
  
 
  ngOnInit() {

  }

  closeHeroModal(): void {
    this.closeModal.emit(true);
  }
}
