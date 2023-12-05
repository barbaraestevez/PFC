import { Role } from "./roles.type";

export interface UserCredentials {
    email:string;
    password: string;
}

export interface User extends UserCredentials {
    username: string;
    role: Role;
}