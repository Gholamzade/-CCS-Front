import { Component, OnInit } from '@angular/core';
import { ProductionPlan } from 'src/app/models/ProductionPlan';
import { ProductionplanService } from 'src/app/services/productionplan.service';



@Component({
  selector: 'planed-heat-presenter',
  template: `
  <planed-heat-view [planedheatList]="planedheatList">
(productionplan)="deleteplan($event)"
  </planed-heat-view>`
})
export class PlanedHeatPresenter implements OnInit {
  planedheatList:ProductionPlan[];
  constructor(private productionplanService:ProductionplanService) {

    this.productionplanService.getProductionplans().subscribe(res=>{
      if (res.telId!=0)
      {
        this.planedheatList=res.telData?.lstproductionPlan;
      }
      else
      console.log(res);
    })

  }

  ngOnInit(): void {
  }

  deleteplan(productionplan:ProductionPlan)
  {
    this.productionplanService.deleteplan(productionplan.productionPlanId).subscribe(res=>{
      if (res.telId!=0)
      {
        //this.planedheatList=res.telData?.lstproductionPlan
      }
      else
      console.log(res);
    })
  }
}
