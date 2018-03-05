import { Component, Input, OnInit, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../models/hero';
import { HeroService } from '../hero.service';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/finally';
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";

@Component({
	selector: 'my-hero-detail',
	templateUrl: './hero-detail.component.html',
	styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit, AfterViewInit {

	hero: Hero;
	isCreating: boolean = true;
	error: any;
	saveLoading: boolean = false;

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

	save(): void {
		// Template driven forms
		this.error = null;
		if (!this.validateForm()) return;
		this.saveLoading = true;
		this.heroService.save(this.hero)
			.finally(() => this.saveLoading = false)
			.subscribe(
			() => this.location.back(),
			(err: any) => this.error = err
			)
	}

	validateForm(): boolean {
		this.nameMsg = this.descriptionMsg = '';
		if (!this.hero.name || !this.hero.name.length) {
			this.nameMsg += this.validationNameMsgs.required;
		}
		else if (this.hero.name.length > 20) {
			this.nameMsg += this.nameMsg.length ? ' ' : '' + this.validationNameMsgs.maxlength;
		}

		if (this.hero.description && this.hero.description.length > 200) {
			this.descriptionMsg += this.validationDescriptionMsgs.maxlength;
		}

		return !this.nameMsg.length && !this.descriptionMsg.length;
	}

	focusInput(): void {
		this.heroNameInput.first.nativeElement.focus();
	}

	set birthdate(value: string) {
		if (value && value.length) {
			this.hero.birthdate = new Date(value);
		}
	}
}
