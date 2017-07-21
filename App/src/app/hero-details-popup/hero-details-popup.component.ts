import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Hero } from "app/models/hero";

@Component({
    selector: 'hero-details-popup',
    templateUrl: './hero-details-popup.component.html',
    styleUrls: ['./hero-details-popup.component.css']
})
export class HeroDetailsPopupComponent implements OnInit {
    @Input() hero: Hero;

    constructor() { }

    ngOnInit() {

    }

    close(): void {
        this.hero = null;
    }
}
