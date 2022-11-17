import { Interface } from "readline";

export interface IUser {
    _id: number;
    name: string;
    email: string;
    password?: string;
    role: string;
    createdAt?: string;
    updatedAt?: string;
}