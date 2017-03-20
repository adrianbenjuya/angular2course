import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Hero } from "app/models/hero";
declare var $: any;

@Component({
    selector: 'hero-details-popup',
    templateUrl: './hero-details-popup.component.html',
    styleUrls: ['./hero-details-popup.component.css']
})
export class HeroDetailsPopupComponent implements OnInit {

    private _hero: Hero;
    private _show: boolean = false;

    // Enfoque 1
    @Input() set hero(value: Hero) {
        this._hero = value;
        this._show = this._hero != null;
    }

    // Enfoque 2
    // @Input() hero: Hero;

    // private get show(): boolean {
    //     return this.hero != null;
    // }

    @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

    constructor() { }

    ngOnInit() {

    }

    private close(): void {
        this.onClose.emit();
    }
}
