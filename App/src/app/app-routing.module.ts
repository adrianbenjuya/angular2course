import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroDetailsPopupComponent } from './hero-details-popup/hero-details-popup.component';
import { LoadingComponent } from './loading/loading.component';

const routes: Routes = [
  {
    path: 'dashboard',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DashboardComponent
  },

  // Ejercicio 21
  // {
  //   // Enfoque A
  //   path: 'detail/:id',
  //   // Enfoque B
  //   //path: 'detail',
  //   component: HeroDetailComponent
  // },

  // Ejercicio 20
  // {
  //   path: 'create',
  //   component: HeroDetailComponent
  // },

  // Ejercicio 14
  {
    path: 'heroes',
    component: HeroesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [DashboardComponent, HeroesComponent, HeroDetailComponent, HeroDetailsPopupComponent, LoadingComponent];
