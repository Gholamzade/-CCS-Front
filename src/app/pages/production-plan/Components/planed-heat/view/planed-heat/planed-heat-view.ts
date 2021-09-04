import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductionPlan } from 'src/app/models/ProductionPlan';


@Component({
  selector: 'planed-heat-view',
  templateUrl: './planed-heat-view.html',
  styleUrls: ['./planed-heat-view.scss']
})
export class PlanedHeatView implements OnInit {

  displayedColumns: string[] = ['metLine'//, 'heatStat.heatStatusDescription'
  //, 'DICLadle.LadleCode', 'DICISG.ISGCode'
  , 'startTime', 'endTime'  ,  'wtNetLiquidSteel', 'ladleEmptyWeight'//, "seqOfTotalSeq",
  //"Strand1Length", "Strand1Width", "Strand1Thickness", "Strand2Length", "Strand2Width", "Strand2Thickness"

];
  @Input() planedheatList:ProductionPlan[];
  @Output() productionPlan:EventEmitter<ProductionPlan>=new EventEmitter<ProductionPlan>();
  constructor() {
   }

  ngOnInit(): void {
  }
deleteplan(productionplan:ProductionPlan){
this.productionPlan.emit(productionplan)
}
}
