import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeroService } from './hero.service';

import { HeroTileComponent } from './hero-tile/hero-tile.component';
import { DashboardComponent } from "app/dashboard/dashboard.component";
import { HeroesComponent } from "app/heroes/heroes.component";
import { HeroDetailsPopupComponent } from "app/hero-details-popup/hero-details-popup.component";
import { HeroDetailComponent } from "app/hero-detail/hero-detail.component";
import { LoadingComponent } from "app/shared/loading/loading.component";
import { MarkDirective } from "app/shared/mark/mark.directive";
import { HeroDetailsReactiveComponent } from "app/hero-details-reactive/hero-details-reactive.component";
import { PaginatorComponent } from "app/shared/paginator/paginator.component";

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    PaginatorComponent,
    HeroTileComponent,
    MarkDirective,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    HeroDetailsPopupComponent,
    LoadingComponent,
    HeroDetailsReactiveComponent
  ],
  providers: [
    HeroService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
