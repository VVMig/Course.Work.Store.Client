import { makeAutoObservable } from 'mobx';
import { IProduct, IUser } from './interfaces';

class User implements IUser {
    role = undefined;
    email?: string = undefined;
    firstName?: string = undefined;
    id?: string = undefined;
    isVerified?: boolean = undefined;
    lastName?: string = undefined;
    cart: IProduct[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    isAuth = () => {
        return !!this.id;
    };

    loginUser = (userData: IUser) => {
        Object.keys(userData).forEach((key) => {
            this[key] = userData[key];
        });
    };

    logoutUser = () => {
        this.role = undefined;
        this.email = undefined;
        this.firstName = undefined;
        this.id = undefined;
        this.isVerified = undefined;
        this.lastName = undefined;
        this.cart = [];
    };

    updateCart = (items: IProduct[]) => {
        this.cart = items.slice();
    };

    getFullName = () => `${this.firstName} ${this.lastName}`;

    isItemInCart = (id) => this.cart.some((item) => item._id === id);
}

export default new User();
