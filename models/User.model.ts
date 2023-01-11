export interface IUser {
    name: string;
    email: string;
    password: string;
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