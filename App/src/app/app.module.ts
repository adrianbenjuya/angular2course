import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule, routedComponents } from './app-routing.module';
import { HeroService } from './hero.service';

import { ConfirmOptions, Position } from 'angular2-bootstrap-confirm';
import { Positioning } from 'angular2-bootstrap-confirm/position';
import { ConfirmModule } from 'angular2-bootstrap-confirm';

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
    routedComponents
  ],
  providers: [
    HeroService,
    ConfirmOptions,
    { provide: Position, useClass: Positioning }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
