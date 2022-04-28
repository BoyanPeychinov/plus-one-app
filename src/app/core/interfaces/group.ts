import { IBase } from "./base";

export interface IGroup extends IBase {
    name: string,
    players: string[]
}