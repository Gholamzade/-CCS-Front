import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionPlanPagePresenter } from './production-plan-page-Presenter';
import { ProductionPlanPageView } from './view/production-plan-page-view';
import { PlanedHeatPresenter } from  './Components/planed-heat/planed-heat-presenter';
import { PlanedHeatView } from  './Components/planed-heat/view/planed-heat/planed-heat-view';
import { MaterialModule } from '@arc.module/material.module';
import { ArcModule } from '@arc.module/arc.module';
import {MatTableModule} from '@angular/material/table';
import { ProductionPlanPageRoutingModule } from './production-plan-page-routing.module';
import { CastHeatView } from './Components/cast-heat/view/cast-heat-view';
import { CastHeatPresenter } from './Components/cast-heat/cast-heat-presenter';


@NgModule({
  declarations: [
    ProductionPlanPagePresenter,
    ProductionPlanPageView,
    PlanedHeatPresenter,
    PlanedHeatView,
    CastHeatView,
    CastHeatPresenter
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatTableModule,
    ArcModule,
    ProductionPlanPageRoutingModule
  ],
  exports:[

    ProductionPlanPagePresenter,
    ProductionPlanPageView,
    PlanedHeatPresenter,
    PlanedHeatView,
    CastHeatView,
    CastHeatPresenter
  ]
})
export class ProductionPlanPageModule { }
