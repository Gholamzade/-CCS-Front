import { IFullTelegramLogItem } from './full-telegram-log-item.interface';
export interface ITelegramSearchResult {
  totalCount: number;
  list: IFullTelegramLogItem[]
}
