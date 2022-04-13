import { IUser } from '../store/interfaces';

export interface IAuthSignInArgs {
    email: string;
    password: string;
}

export interface IAuthSignUpArgs extends IAuthSignInArgs {
    firstName: string;
    lastName: string;
}

export interface IAuthResponse {
    accessToken: string;
    refreshToken: string;

    user: IUser;
}
