import { Component, Input, OnInit } from '@angular/core';
import { Heat } from 'src/app/models/Heat';
import { HeatService } from 'src/app/services/heat.service';

@Component({
  selector: 'cast-heat-presenter',
  template: `<cast-heat-view [castheatList]="castheatList"></cast-heat-view>`
})
export class CastHeatPresenter implements OnInit {
   castheatList:Heat[];

  constructor(private heatService: HeatService ) {

    this.heatService.GetSequenceHeats().subscribe(res=>{
      if (res.telId!=0)
      {
        this.castheatList=res.telData?.lstHeat;
        console.log(this.castheatList);
      }
      else
      console.log(res);
    })
     }



  ngOnInit(): void {
  }

}
