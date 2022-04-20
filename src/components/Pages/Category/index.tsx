import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { Title } from '../../../constants/HeaderOptions';
import { requestErrorMessage } from '../../../helpers/errorResponse';
import { useQuery } from '../../../hooks/useQueryParams';
import { getProductsByCategory } from '../../../services/productApiService';
import { Bootstrap } from '../../../store';
import { IProduct } from '../../../store/interfaces';
import { ProductCard } from '../../Common/ProductCard';
import { ProductSkeleton } from '../../Common/ProductSkeleton';

export const Category = observer(() => {
    const categoryType = useQuery().get('type');
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState<IProduct[]>();

    const getProducts = useCallback(
        (category: string) => async () => {
            try {
                setIsLoading(true);

                const filteredCategory = Bootstrap.findProperCatefory(category);
                const { data } = await getProductsByCategory(filteredCategory);

                setProducts(data);
            } catch (error) {
                toast.error(requestErrorMessage(error));
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    useEffect(() => {
        if (Bootstrap.navItems.length) {
            getProducts(categoryType)();
        }
    }, [categoryType, Bootstrap.navItems]);

    return (
        <>
            <div className="products-list">
                {isLoading ? (
                    <ProductSkeleton />
                ) : (
                    products?.map((product) => (
                        <ProductCard
                            key={product.id}
                            title={product.title}
                            price={product.price}
                            id={product.id}
                            category={product.category}
                            updateProductsList={getProducts(categoryType)}
                            briefInformation={product.briefInformation}
                            imageSrc={
                                product.images.find((image) => image.isMain)
                                    ?.url
                            }
                        />
                    ))
                )}
            </div>
            <Helmet>
                <title>
                    {Title.HOME}-{categoryType}
                </title>
            </Helmet>
        </>
    );
});
