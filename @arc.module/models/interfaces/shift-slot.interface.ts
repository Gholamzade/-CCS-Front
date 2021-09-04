import { IShiftPair } from './shift-pair.interface';
export interface IShiftSlot {
  day: number;
  shifts: IShiftPair[];
}
