import { ISimpleTelegramLogItem } from './simple-telegram-log-item.interface';
export interface ITelegramLogList {
  telegramLogItems: ISimpleTelegramLogItem[];
  total?: number;
  pageSize: number;
  pageIndex: number;
  //lastPage?: number
}
