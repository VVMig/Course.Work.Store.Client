import { Roles } from '../constants/Roles';

export interface IUser {
    email?: string;
    firstName?: string;
    id?: string;
    isVerified?: boolean;
    lastName?: string;
    role?: Roles;
    cart: IProduct[];
}

export interface IProductImage {
    url: string;
    isMain: boolean;
}

export interface IProduct {
    id: string;
    title: string;
    description: string;
    price: number;
    images: IProductImage[];
    amount: number;
    commonId: string;
    briefInformation: string;
    category: string;
}

export interface INavigation {
    navItems: string[];
}
