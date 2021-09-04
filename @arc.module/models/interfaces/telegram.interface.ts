import { IRestrictedUgTelegram } from './restricted-ug-telegram.interface';
export interface ITelegram {
  telegramId: number;
  name: string;
  description: string;
  body: string;
  lifeTime: number;
  singleInstance: boolean;
  saveInHistory: boolean;
  enabled: boolean;
  restrictedUgTelegram: IRestrictedUgTelegram[];
  idWithName?: string;
}
