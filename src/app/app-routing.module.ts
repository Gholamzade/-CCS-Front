import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ARC_ROUTES } from '@arc.module/arc-routes';

export const routes: Routes = [
    {path : 'Production' ,
loadChildren :() => import('./pages/production-plan/production-plan-page.module').then(
  m=>m.ProductionPlanPageModule),},
  ...ARC_ROUTES,
]


@NgModule({
  imports: [RouterModule.forRoot(routes , { useHash :true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
