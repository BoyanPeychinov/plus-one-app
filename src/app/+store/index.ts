import { IUser } from "../core/interfaces/user";

export * from './actions';
export * from './reducers';

export interface IMainState {
    currentUser: IUser;
    // sessionToken: string;
}