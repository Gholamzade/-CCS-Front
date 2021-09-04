import { IConnectUgSubmenu } from "./connect-ug-submenu.interface";

export interface ISubmenu {
  submenuId: number;
  titleEn: String;
  titleFa: String;
  captionEn: String;
  captionFa: String;
  route: string;
  menuFk: number;
  position: number;
  shortcut: number;
  connectUgSubmenu?: IConnectUgSubmenu[];
}
