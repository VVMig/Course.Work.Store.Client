import { Button } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import EmptyCartImage from '../../../assets/images/empty-cart.png';
import { Title } from '../../../constants/HeaderOptions';
import { URL } from '../../../constants/URL';
import { User } from '../../../store';
import PurchaseProduct from '../../../store/PurchaseProduct';
import { ProductCard } from '../../Common/ProductCard';

export const Cart = observer(() => {
    const navigate = useNavigate();

    const onClickBuy = () => {
        PurchaseProduct.setPurchaseProduct(User.cart);

        navigate(URL.PURCHASE);
    };

    return (
        <>
            <div className="cart-page">
                {User.cart.length ? (
                    <>
                        <div className="cart-page__products-list">
                            {User.cart?.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    title={product.title}
                                    price={product.price}
                                    id={product._id}
                                    category={product.category}
                                    briefInformation={product.briefInformation}
                                    isCart
                                    product={product}
                                />
                            ))}
                        </div>
                        <div className="cart-page__actions">
                            <Button
                                color="info"
                                variant="contained"
                                onClick={onClickBuy}
                            >
                                Buy All
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="cart-page__empty">
                        <img src={EmptyCartImage} />
                    </div>
                )}
            </div>
            <Helmet>
                <title>{Title.CART}</title>
            </Helmet>
        </>
    );
});
