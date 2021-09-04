export interface IAlertLogFilter {
  pageNumber: number;
  pageSize: number;
  alerts?: number[];
  prm1?: string;
  prm2?: string;

  prm3?: string;
  alertType?: number;
  fromDate?: Date;
  toDate?: Date;
}
