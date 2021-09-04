import { IUser } from './user.interface';
export interface IUserEdit {
  user: IUser;
  changePassword: boolean;
}
