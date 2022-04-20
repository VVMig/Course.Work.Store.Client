import React from 'react';
import { PaymentMethods } from '../../../../constants/PaymentMethods';

interface ICustomerInfo {
    address: string;
    tel: string;
    commentary?: string;
}

interface IProps {
    customerInfo: ICustomerInfo;
    paymentMethod: PaymentMethods;
    amount: number;
    price: number;
}

export const Confirmation = ({
    customerInfo,
    amount,
    paymentMethod,
    price,
}: IProps) => {
    return (
        <div className="purchase-page__confirmation">
            <div className="purchase-page__confirmation__section">
                <h3>Amount: {amount}</h3>
            </div>
            <div className="purchase-page__confirmation__section">
                <h3>Price: {price}$</h3>
            </div>
            <div className="purchase-page__confirmation__section">
                <h3>Address: {customerInfo.address}</h3>
            </div>
            <div className="purchase-page__confirmation__section">
                <h3>Phone number: {customerInfo.tel}</h3>
            </div>
            {!!customerInfo.commentary && (
                <div className="purchase-page__confirmation__section">
                    <h3>Commentary: {customerInfo.commentary}</h3>
                </div>
            )}
            <div className="purchase-page__confirmation__section">
                <h3>Payment method: {paymentMethod}</h3>
            </div>
        </div>
    );
};
