import { IShift } from './IShift.interface';
import { ITeam } from './ITeam.interface';
export interface IShiftAssgin {
  year: number;
  day: number;
  team: ITeam;
  shfit: IShift;
}
