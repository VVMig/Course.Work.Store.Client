import { Card, CardContent } from '@mui/material';
import React from 'react';

interface IProps {
    totalProducts: number;
    totalTransactions: number;
    totalEarns: number;
    usersAmount: number;
}

export const TotalStats = ({
    totalEarns,
    totalProducts,
    totalTransactions,
    usersAmount,
}: IProps) => {
    return (
        <Card className="stats__total">
            <CardContent>
                <h3>Common Information</h3>
                <div className="stats__total__section">
                    Products amount: <span>{totalProducts}</span>
                </div>
                <div className="stats__total__section">
                    Transactions amount: <span>{totalTransactions}</span>
                </div>
                <div className="stats__total__section">
                    Earnings: <span>{totalEarns}$</span>
                </div>
                <div className="stats__total__section">
                    Registered users: <span>{usersAmount}</span>
                </div>
            </CardContent>
        </Card>
    );
};
