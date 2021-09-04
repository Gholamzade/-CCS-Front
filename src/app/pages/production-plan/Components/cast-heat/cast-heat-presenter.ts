import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { Heat } from 'src/app/models/Heat';
import { HeatService } from 'src/app/services/heat.service';

@Component({
  selector: 'cast-heat-presenter',
  template: `
  <cast-heat-view
  [cast-heat-list]="castHeatList"
  ></cast-heat-view>
  `,
})
export class CastHeatPresenter implements OnInit {

  castHeatList: Heat[];

  constructor(private heatService: HeatService) { }


  ngOnInit() {
    this.heatService.GetSequenceHeats().subscribe(res=>{
      if (res.telId!=0)
      {
        this.castHeatList=res.telData?.lstHeat;
        console.log(this.castHeatList);
      }
      else
      console.log(res);
    })
  }
}
