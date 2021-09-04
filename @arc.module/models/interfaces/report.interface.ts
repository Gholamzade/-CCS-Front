import { IConnectUgReport } from './connect-ug-report.interface';
export interface IReport {
  reportId: number;
  title: string;
  name: string;
  revision: string;
  reportGroupFk: number;
  position: number;
  serverAddress?: string;
  connectUgReport?: IConnectUgReport[];
}

export interface ITelerikReportParameters {
  report: string;
  parameters: any;
}
