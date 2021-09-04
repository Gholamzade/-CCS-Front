import { IRestrictedUgAlert } from './restricted-ug-alert.interface';
export interface IAlert {
  alertId: number,
  title: string;
  template: string;
  prm1Title: string;
  prm2Title: string;
  prm3Title: string;
  isSound: boolean;
  isPopup: boolean;
  isActive: boolean;
  saveInHistory: boolean;
  alertTypeFk: number;
  restrictedUgAlert?: IRestrictedUgAlert[];
}
