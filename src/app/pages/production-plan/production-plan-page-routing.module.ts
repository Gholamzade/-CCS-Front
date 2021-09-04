import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductionPlanPagePresenter } from './production-plan-page-Presenter';

export const routes: Routes = [
   {path: '', component:ProductionPlanPagePresenter },
//   {path : 'Production' ,
// loadChildren :() => import('./pages/production-plan/production-plan-page.module').then(
//   m=>m.ProductionPlanPageModule),},
]


@NgModule({
  imports: [RouterModule.forChild(routes )],
  exports: [RouterModule]
})
export class ProductionPlanPageRoutingModule { }
