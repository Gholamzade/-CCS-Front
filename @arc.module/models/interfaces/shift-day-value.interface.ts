import { IShiftTeam } from './shift-team.interface';

export interface IShiftDayValue {
  year: number;
  month: number;
  day: number;
  shiftTeamList: IShiftTeam[];
}