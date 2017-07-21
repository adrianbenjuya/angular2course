import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeroService } from './hero.service';

import { ConfirmOptions, Position } from 'angular2-bootstrap-confirm';
import { Positioning } from 'angular2-bootstrap-confirm/position';
import { ConfirmModule } from 'angular2-bootstrap-confirm';
import { HeroTileComponent } from './hero-tile/hero-tile.component';
import { DashboardComponent } from "app/dashboard/dashboard.component";
import { HeroesComponent } from "app/heroes/heroes.component";
import { HeroDetailsPopupComponent } from "app/hero-details-popup/hero-details-popup.component";
import { HeroDetailComponent } from "app/hero-detail/hero-detail.component";
import { LoadingComponent } from "app/shared/loading/loading.component";
import { MarkDirective } from "app/shared/mark/mark.directive";
import { FilterPipe } from "app/shared/filter/filter.pipe";
import { HeroDetailsReactiveComponent } from "app/hero-details-reactive/hero-details-reactive.component";
import { PaginatorComponent } from "app/shared/paginator/paginator.component";

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    ConfirmModule
  ],
  declarations: [
    AppComponent,
    PaginatorComponent,
    HeroTileComponent,
    FilterPipe,
    MarkDirective,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    HeroDetailsPopupComponent,
    LoadingComponent,
    HeroDetailsReactiveComponent
  ],
  providers: [
    HeroService,
    ConfirmOptions,
    { provide: Position, useClass: Positioning }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
