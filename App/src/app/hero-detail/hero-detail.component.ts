import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../models/hero';
import { HeroService } from '../hero.service';
import { Observable } from "rxjs/Observable";
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";

@Component({
  selector: 'my-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;
  isCreating: boolean = true;
  error: any;
  originalImg: string;
  tempImg: string;
  resetImg: boolean = false;
  saveLoading: boolean = false;

  //Reactive Form
  heroForm: FormGroup;
  nameMsg: string;
  validationNameMsgs: any = {
    required: 'The Name field is required',
    maxlength: "The Name can't have more than 20 characters"
  }
  descriptionMsg: string;
  validationDescriptionMsgs: any = {
    maxlength: "The Description can't have more than 200 characters"
  }
  image: string;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.route.params
    .switchMap(
      (param: Params) => {
        let id: string = param['id'];
        if (id && id.length) {
          this.isCreating = false;
          return this.heroService.getHero(+id);
        }
        
        return Observable.of(new Hero());
      }
    )
    .subscribe(
      (hero: Hero) => {

        // Template driven form
        this.hero = hero;
        //this.originalImg = this.hero ? this.hero.image : '';
        //this.tempImg = this.originalImg;

        // Reactive form
        this.heroForm = this.fb.group({
          id: { value: hero.id, disabled: true },
          name: [hero.name, [Validators.required, Validators.maxLength(20)]],
          description: [hero.description, Validators.maxLength(200)],
          image: hero.image
        });

        const nameControl: AbstractControl = this.heroForm.get('name');
        const descriptionControl: AbstractControl = this.heroForm.get('description');
        nameControl.valueChanges.subscribe((v: any) => this.nameMsg = this.setMessage(this.validationNameMsgs, nameControl))
        descriptionControl.valueChanges.subscribe((v: any) => this.descriptionMsg = this.setMessage(this.validationDescriptionMsgs, descriptionControl))
      },
      (err: any) => this.error = err
    );
  }

  setMessage(validationMsgs: any, control: AbstractControl): string {
    if ((control.touched || control.dirty) && control.errors) {
      return Object.keys(control.errors).map((key: string) => validationMsgs[key]).join(' ');
    }
    return '';
  }

  save(): void {
    // Template driven forms
    // this.error = null;
    //   this.saveLoading = true;
    //   this.heroService.save(this.hero).subscribe(
    //     () => this.location.back(),
    //     (err: any) => this.error = err,
    //     () => this.saveLoading = false
    //   )

    // Reactive forms
    if (this.heroForm.dirty && this.heroForm.valid) {
      this.error = null;
      this.saveLoading = true;
      let hero: any = Object.assign({}, this.hero, this.heroForm.value);
      this.heroService.save(hero).subscribe(
        () => this.location.back(),
        (err: any) => this.error = err,
        () => this.saveLoading = false
      )
    }
  }

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
