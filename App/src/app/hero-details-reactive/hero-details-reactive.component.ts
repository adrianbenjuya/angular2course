import { Component, Input, OnInit, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../models/hero';
import { HeroService } from '../hero.service';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/finally';
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";

@Component({
	selector: 'hero-details-reactive',
	templateUrl: './hero-details-reactive.component.html',
	styleUrls: ['./hero-details-reactive.component.scss']
})
export class HeroDetailsReactiveComponent implements OnInit, AfterViewInit {

	hero: Hero;
	isCreating: boolean = true;
	error: any;
	saveLoading: boolean = false;

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

	@ViewChildren('heroNameInput') heroNameInput: QueryList<ElementRef>;

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

				this.hero = hero;

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

	ngAfterViewInit(): void {
		if (!this.heroNameInput.first) {
			this.heroNameInput.changes.subscribe(
				(change: any) => this.focusInput()
			)
		}
		else {
			this.focusInput()
		}
	}

	setMessage(validationMsgs: any, control: AbstractControl): string {
	  if ((control.touched || control.dirty) && control.errors) {
	    return Object.keys(control.errors).map((key: string) => validationMsgs[key]).join(' ');
	  }
	  return '';
	}

	save(): void {
		if (this.heroForm.dirty && this.heroForm.valid) {
		  this.error = null;
		  this.saveLoading = true;
		  let hero: any = Object.assign({}, this.hero, this.heroForm.value);
		  this.heroService.save(hero)
		  .finally(() => this.saveLoading = false)
		  .subscribe(
		    () => this.location.back(),
		    (err: any) => this.error = err
		  )
		}
	}

	focusInput(): void {
		this.heroNameInput.first.nativeElement.focus();
	}
}
