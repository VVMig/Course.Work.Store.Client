import { Roles } from '../constants/Roles';

export interface IUser {
    email?: string;
    firstName?: string;
    id?: string;
    isVerified?: boolean;
    lastName?: string;
    role?: Roles;
    cart: IProduct[];
    lastLogin?: Date;
}

export interface IProductImage {
    url: string;
    isMain: boolean;
}

export interface IProduct {
    id: string;
    _id?: string;
    title: string;
    description: string;
    price: number;
    images: IProductImage[];
    amount: number;
    commonId?: string;
    briefInformation?: string;
    category: string;
    transactionsAmount: number;
}

export interface INavigation {
    navItems: string[];
}
