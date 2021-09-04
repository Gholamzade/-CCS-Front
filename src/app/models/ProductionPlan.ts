export interface ProductionPlan{

  productionPlanId: number;
  puno: number;
  metLine: number;
  dpline: number;
  heatStatId: number;
  iscurrent: number;
  isg: number;
  tundishSeq: number;
  tundishTotalSeq: number;
  startTime: string;
  endTime?: string;
  ccostartPlan: string;
  ccostartActual: string;
  duration?: number;
  lastTemp?: number;
  lastTempTakenTime?: string;
  flyTund?: string;
  idladle?: number;
  ladleEmptyWeight: number;
  lfladleEmptyWeight?: number;
  wtLadleAddLiquidSteel: number;
  wtNetLiquidSteel: number;
  turretArmNo?: number;
  l2heatStatusb4Lsgo: number;
  previousPuno?: number;
  previousPustartPlan?: string;
  previousPuendPlan?: string;
  previousPustartActual?: string;
  previousPuendActual?: string;
  preheatingStartPlan?: string;
  conConStatus?: string;
  puseq?: number;
  stageName?: string;
  version: string;
  tundishId?: number;

  // heatStat: HeatStat;
  // isgNavigation: IsgNavigation2;
}


// export interface IsgNavigation {
//   idisg: number;
//   isgcode: string;
//   unit: number;
//   unitSegment: string;
//   ver?: any;
//   efsdripercent?: any;
//   efsbasketPercent?: any;
//   efsoxygenPpmmax?: any;
//   efsblowingTimeMin?: any;
//   efsrintappingTemperatureC?: any;
//   efslfstappingTemperatureC?: any;
//   productionCycle?: any;
//   notes: string;
//   isdeleted: boolean;
//   modifier: string;
//   modifyDate: string;
//   regBy: string;
//   regDate?: any;
//   modeDateTime: string;
//   regDateTime: string;
//   cloAffectionIsg: any[];
//   dicisganalyzeTemperature: any[];
//   dicisgargonGasFlow: any[];
//   dicisgccsspeed: any[];
//   dicisgelement: any[];
//   dicisgferosilicoMangenezTappingConditionsMaster: any[];
//   dicisgheatTemperature: any[];
//   dicisghmocurve: any[];
//   dicisgmaterial: any[];
//   dicisgpowders: any[];
//   dicisgprimaryCooling: any[];
//   dicisgsecondaryCooling: any[];
//   dicisgtappingCondition: any[];
//   dicisgtundishWeightSpeedReduction: any[];
//   dicisgwaterFlow: any[];
//   hProductionPlan: any[];
//   hSequenceDicisgpowders: any[];
//   heatHIsgproducedNavigation: any[];
//   heatHIsgscheduleNavigation: any[];
//   heatIsgproducedNavigation: any[];
//   heatIsgscheduleNavigation: any[];
//   productionPlan: ProductionPlan[];
//   sequenceDicisgpowders: any[];
// }


// export interface ProductionPlan2 {
//   productionPlanId: number;
//   puno: number;
//   metLine: number;
//   dpline: number;
//   heatStatId: number;
//   iscurrent: number;
//   isg: number;
//   tundishSeq: number;
//   tundishTotalSeq: number;
//   startTime: string;
//   endTime?: any;
//   ccostartPlan: string;
//   ccostartActual: string;
//   duration?: any;
//   lastTemp?: any;
//   lastTempTakenTime?: any;
//   flyTund?: any;
//   idladle?: any;
//   ladleEmptyWeight: number;
//   lfladleEmptyWeight?: any;
//   wtLadleAddLiquidSteel: number;
//   wtNetLiquidSteel: number;
//   turretArmNo?: any;
//   l2heatStatusb4Lsgo: number;
//   previousPuno?: any;
//   previousPustartPlan?: any;
//   previousPuendPlan?: any;
//   previousPustartActual?: any;
//   previousPuendActual?: any;
//   preheatingStartPlan?: any;
//   conConStatus?: any;
//   puseq?: any;
//   stageName?: any;
//   version: string;
//   tundishId?: any;
//   idladleNavigation?: any;
//   isgNavigation: IsgNavigation;
//   punoNavigation?: any;
//   tundish?: any;
//   heat: any[];
//   productionPlanStrand: any[];
// }

// export interface HeatStat {
//   heatStatId: number;
//   heatStatusCode: number;
//   heatStatusDescription: string;
//   version: string;
//   hProductionPlan: any[];
//   productionPlan: ProductionPlan2[];
// }


// interface IsgNavigation2 {
//   idisg: number;
//   isgcode: string;
//   unit: number;
//   unitSegment: string;
//   ver?: any;
//   efsdripercent?: any;
//   efsbasketPercent?: any;
//   efsoxygenPpmmax?: any;
//   efsblowingTimeMin?: any;
//   efsrintappingTemperatureC?: any;
//   efslfstappingTemperatureC?: any;
//   productionCycle?: any;
//   notes?: any;
//   isdeleted: boolean;
//   modifier: string;
//   modifyDate: string;
//   regBy: string;
//   regDate: string;
//   modeDateTime: string;
//   regDateTime: string;
//   cloAffectionIsg: any[];
//   dicisganalyzeTemperature: any[];
//   dicisgargonGasFlow: any[];
//   dicisgccsspeed: any[];
//   dicisgelement: any[];
//   dicisgferosilicoMangenezTappingConditionsMaster: any[];
//   dicisgheatTemperature: any[];
//   dicisghmocurve: any[];
//   dicisgmaterial: any[];
//   dicisgpowders: any[];
//   dicisgprimaryCooling: any[];
//   dicisgsecondaryCooling: any[];
//   dicisgtappingCondition: any[];
//   dicisgtundishWeightSpeedReduction: any[];
//   dicisgwaterFlow: any[];
//   hProductionPlan: any[];
//   hSequenceDicisgpowders: any[];
//   heatHIsgproducedNavigation: any[];
//   heatHIsgscheduleNavigation: any[];
//   heatIsgproducedNavigation: any[];
//   heatIsgscheduleNavigation: any[];
//   productionPlan: any[];
//   sequenceDicisgpowders: any[];
// }




