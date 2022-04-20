import { Skeleton } from '@mui/material';
import React from 'react';

interface IProps {
    itemsAmount?: number;
}

export const ProductSkeleton = ({ itemsAmount = 8 }: IProps) => {
    return (
        <>
            {Array.from(
                {
                    length: itemsAmount,
                },
                (_, index) => index
            ).map((_, index) => (
                <Skeleton
                    key={index}
                    width={270}
                    height={370}
                    style={{
                        borderRadius: 15,
                    }}
                    variant="rectangular"
                />
            ))}
        </>
    );
};
