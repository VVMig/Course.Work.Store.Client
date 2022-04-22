import { SearchOff } from '@mui/icons-material';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { Title } from '../../../constants/HeaderOptions';
import { requestErrorMessage } from '../../../helpers/errorResponse';
import { useQuery } from '../../../hooks/useQueryParams';
import { searchProducts } from '../../../services/productApiService';
import { IProduct } from '../../../store/interfaces';
import { ProductCard } from '../../Common/ProductCard';
import { ProductSkeleton } from '../../Common/ProductSkeleton';

export const SearchPage = () => {
    const searchText = useQuery().get('searchText');

    const [isLoading, setIsLoading] = useState(true);
    const [searchedProducts, setSearchProducts] = useState<IProduct[]>([]);

    const searchProductsByText = async () => {
        setIsLoading(true);

        if (!searchText) {
            setSearchProducts([]);
            setIsLoading(false);

            return;
        }

        try {
            const { data } = await searchProducts(searchText);

            setSearchProducts(data);
        } catch (error) {
            toast.error(requestErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        searchProductsByText();
    }, [searchText]);

    return (
        <>
            <div
                className={clsx('search-page', {
                    ['search-page_empty']:
                        !isLoading && !searchedProducts.length,
                })}
            >
                {isLoading ? (
                    <ProductSkeleton />
                ) : searchedProducts.length ? (
                    searchedProducts?.map((product) => (
                        <ProductCard
                            key={product.id}
                            title={product.title}
                            price={product.price}
                            id={product.id}
                            category={product.category}
                            briefInformation={product.briefInformation}
                            product={product}
                            imageSrc={
                                product.images.find((image) => image.isMain)
                                    ?.url
                            }
                        />
                    ))
                ) : (
                    <>
                        <SearchOff />
                        <h2>Nothing Found</h2>
                    </>
                )}
            </div>
            <Helmet>
                <title>
                    {Title.SEARCH}-{searchText}
                </title>
            </Helmet>
        </>
    );
};
