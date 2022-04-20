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
                    width={300}
                    height={400}
                    style={{
                        borderRadius: 15,
                    }}
                    variant="rectangular"
                />
            ))}
        </>
    );
};
