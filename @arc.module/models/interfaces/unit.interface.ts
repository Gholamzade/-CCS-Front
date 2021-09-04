export interface IUnit {
  unitId: number;
  title: string;
  address?: string;
  lastSeen?: Date;
  tokenRefreshTimeSec?: number;
  unitType?: string;
  parent?: number;
}
