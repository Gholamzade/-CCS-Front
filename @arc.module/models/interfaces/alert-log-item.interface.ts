export interface IAlertLogItem {
  alertLogId: number;
  body: string;
  logDate: string;
  alertLogDate?: string;
  prm1Value?: any;
  prm2Value?: any;
  prm3Value?: any;
  alertId: string;
  title: string;
  sound: boolean;
  popup: boolean;
  type: number;
}