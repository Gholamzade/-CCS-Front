export interface IShiftPlan {
    shiftPlanId: number;
    year: number;
    month: number;
    day: number;
    shiftTeamFk?: number;
    shiftTimeFk: number
}