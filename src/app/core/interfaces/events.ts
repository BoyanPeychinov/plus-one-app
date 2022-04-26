import { IBase } from "./base"

export interface IEvent<T = string> extends IBase {
    rules: string,
    venue: string,
    players?: T[],
    start: string,
    end: string,
    maxPeople: Number,
    day: Date,
}

export interface IEventPost<T = string> {
    rules: string,
    venue: string,
    players?: T[],
    start: string,
    end: string,
    maxPeople: Number,
    day: { [name: string]: string },
}