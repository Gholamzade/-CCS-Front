import { ISubmenu } from "./submenu.interface";


export interface IMenu {
  menuId: number;
  titleEn: String;
  titleFa: String;
  captionEn: String;
  captionFa: String;
  position: number;
  unitFk?: number;
  subMenus?: ISubmenu[];
}
