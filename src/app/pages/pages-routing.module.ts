import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductionPlanPagePresenter } from './production-plan/production-plan-page-Presenter';

const routes: Routes = [
  {
    path:'Production',component:ProductionPlanPagePresenter
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
