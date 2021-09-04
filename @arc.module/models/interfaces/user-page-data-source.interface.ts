import { IUser } from './IUser.interface';
export interface IUserPageDataSource {
  AssignedUsers: IUser[];
  UnAssignedUsers: IUser[];
}
