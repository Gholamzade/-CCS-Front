import { IReport } from './report.interface';
export interface IReportGroup {
  reportGroupId: number;
  title: string;
  serverAddress: string;
  position: number;
  unitFk?: number;
  reports?: IReport[];
}
