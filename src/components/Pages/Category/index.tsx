import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { requestErrorMessage } from '../../../helpers/errorResponse';
import { useQuery } from '../../../hooks/useQueryParams';
import { getProductsByCategory } from '../../../services/productApiService';
import { Bootstrap } from '../../../store';
import { IProduct } from '../../../store/interfaces';
import { ProductCard } from '../../Common/ProductCard';

export const Category = observer(() => {
    const categoryType = useQuery().get('type');
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState<IProduct[]>();

    const getProducts = useCallback(
        (category: string) => async () => {
            try {
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
                {products?.map((product) => (
                    <ProductCard
                        key={product.id}
                        title={product.title}
                        price={product.price}
                        id={product.id}
                        category={product.category}
                        updateProductsList={getProducts(categoryType)}
                    />
                ))}
            </div>
        </>
    );
});
