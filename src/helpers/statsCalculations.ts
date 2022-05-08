import { IProduct } from '../store/interfaces';

export const countEarnings = (products: IProduct[]) =>
    products.reduce(
        (totalEarnings, product) =>
            product.transactionsAmount
                ? totalEarnings + product.price * product.transactionsAmount
                : totalEarnings,
        0
    );

export const countTransactionsAmount = (products: IProduct[]) =>
    products.reduce(
        (totalTransactions, product) =>
            product.transactionsAmount
                ? totalTransactions + product.transactionsAmount
                : totalTransactions,
        0
    );
