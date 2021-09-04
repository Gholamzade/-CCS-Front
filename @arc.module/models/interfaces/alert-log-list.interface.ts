import { IAlertLogItem } from './alert-log-item.interface';


export interface IAlertLogList {
  alertLogItems: IAlertLogItem[];
  total?: number;
  pageSize: number;
  pageNumber: number;
  lastPage?: number
}
