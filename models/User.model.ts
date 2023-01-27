export interface IUser {
    name: string;
    email: string;
    password?: string;
    picture?: string;
    id?: string;
}

export class User implements IUser {
    name: string;
    email: string;
    password: string;

    constructor(user: any = {}) {
        this.name = user.name;
        this.email = user.useremail;
        this.password = user.password;
    }
}

export interface ILoginUser {
    email: string;
    password: string;
}

export interface IRegisterUser {
    email: string;
    password: string;
    name: string;
}

export interface ILoginResponse {
    user: IUser;
    token: string;
}
