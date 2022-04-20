import { StorageKeys } from '../constants/storageKeys';
import { IProduct } from '../store/interfaces';

export const savePurchaseProducts = (products: IProduct[]) => {
    sessionStorage.setItem(
        StorageKeys.PURCHASE_PRODUCT,
        JSON.stringify(products)
    );
};

export const clearPurchaseProducts = () => {
    sessionStorage.removeItem(StorageKeys.PURCHASE_PRODUCT);
};

export const getPurchaseProducts = () =>
    JSON.parse(sessionStorage.getItem(StorageKeys.PURCHASE_PRODUCT));
