import { makeAutoObservable } from 'mobx';
import { IProduct } from './interfaces';

class PurchaseProduct {
    products: IProduct[] | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setPurchaseProduct = (purchaseProducts: IProduct[]) => {
        this.products = purchaseProducts;
    };

    restorePurchaseProduct = () => {
        this.products = null;
    };
}

export default new PurchaseProduct();
