import { IBase } from "./base";

export interface IProfile extends IBase {
    name: string,
    height: number,
    weight: number,
    position: string,
    userId?: string 
}