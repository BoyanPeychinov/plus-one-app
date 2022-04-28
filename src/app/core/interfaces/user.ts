import { IBase } from "./base";

export interface IUser extends IBase {
    username: string,
    password: string,
    sessionToken?: string,
    profile?: string
}
