import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../models/hero';
import { HeroService } from '../hero.service';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'my-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit, AfterViewInit {

  @Input() hero: Hero;
  @Output() close = new EventEmitter();
  @ViewChild('heroNameInput') heroNameInput: ElementRef;
  error: any;
  navigated = false; // true if navigated here
  originalImg: string;
  tempImg: string;
  resetImg: boolean = false;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location) {
  }

  ngOnInit(): void {
    this.route.params
    .switchMap(
      (param: Params) => {
        let id: number = +param['id'];
        if (id !== undefined) {
          this.navigated = true;
          return this.heroService.getHero(id);
        }
        
        return Observable.of(new Hero());
      }
    )
    .subscribe(
      (hero: Hero) => {
        this.hero = hero;
        this.originalImg = this.hero ? this.hero.image : '';
        this.tempImg = this.originalImg;
      },
      (err: any) => this.error = err
    );
  }

  ngAfterViewInit(): void {
    
  }

  save(): void {
    this.error = null;
    this.heroService.save(this.hero).subscribe(
      (response: any) => this.location.back(),
      (err: any) => this.error = err
    )
  }

  // goBack(savedHero: Hero = null): void {
  //   this.close.emit(savedHero);
  //   if (this.navigated) { window.history.back(); }
  // }

  replaceImage(reset: boolean = false) : void {
    if (this.hero.image === this.tempImg && !reset) {
      return;
    }

    if (!reset) {
      this.hero.image = this.tempImg;
    }
    else {
      this.hero.image = this.tempImg = this.originalImg;
    }

    this.resetImg = !reset;
  }
}
