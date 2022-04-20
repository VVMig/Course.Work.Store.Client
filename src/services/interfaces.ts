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

export interface IAddProductBody {
    title: string;
    description: string;
    briefInformation: string;
    price: number;
    category: string;
    images: string[];
}

export interface IPurchaseBody {
    amount?: number;
    address?: string;
    commentary?: string;
    tel?: string;
    paymentMethod?: string;
    ids: string[];
}
