import React from 'react';
import { IProduct } from '../../../store/interfaces';
import { ProductCard } from '../../Common/ProductCard';
import { ProductSkeleton } from '../../Common/ProductSkeleton';

interface IProps {
    title: string;
    products: IProduct[];
    isLoading: boolean;
    itemsAmount?: number;
    updateProductsRequest?: () => Promise<void>;
}

export const ProductSection = ({
    title,
    products,
    updateProductsRequest,
    isLoading,
    itemsAmount = 4,
}: IProps) => {
    return (
        <div className="home-page__products">
            <h2 className="home-page__products__title">{title}</h2>
            <div className="home-page__products__list">
                {isLoading ? (
                    <ProductSkeleton itemsAmount={itemsAmount} />
                ) : (
                    products.map((product) => (
                        <ProductCard
                            key={product.id}
                            title={product.title}
                            price={product.price}
                            id={product.id}
                            category={product.category}
                            updateProductsList={updateProductsRequest}
                            briefInformation={product.briefInformation}
                            imageSrc={
                                product.images.find((image) => image.isMain)
                                    ?.url
                            }
                        />
                    ))
                )}
            </div>
        </div>
    );
};
