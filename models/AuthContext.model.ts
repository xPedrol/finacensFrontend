import {IUser} from "./User.model";

export interface IAuthContext{
    user: IUser | null;
    setUser: (user: IUser) => void;

}