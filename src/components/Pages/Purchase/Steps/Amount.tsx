import { Slider } from '@mui/material';
import React from 'react';

interface IProps {
    onChange?: (
        event: Event,
        value: number | number[],
        activeThumb: number
    ) => void;
    amount: number;
    price: number;
}

export const Amount = ({ onChange, amount, price }: IProps) => {
    return (
        <div className="purchase-page__amount">
            <Slider
                aria-label="Amount"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={10}
                onChange={onChange}
                value={amount}
            />
            <h3 className="purchase-page__amount__value">
                Total Price: {price}$
            </h3>
        </div>
    );
};
