import { Button } from '@mui/material';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Pagination } from 'swiper';
import 'swiper/css/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Title } from '../../../constants/HeaderOptions';
import { URL } from '../../../constants/URL';
import { requestErrorMessage } from '../../../helpers/errorResponse';
import { useQuery } from '../../../hooks/useQueryParams';
import { useToggleCart } from '../../../hooks/useToggleCart';
import { getProduct } from '../../../services/productApiService';
import { User } from '../../../store';
import { IProduct } from '../../../store/interfaces';
import PurchaseProduct from '../../../store/PurchaseProduct';
import { CartButton } from '../../Common/CartButton';

export const Product = observer(() => {
    const [product, setProduct] = useState<IProduct | undefined>();
    const id = useQuery().get('id');
    const handleAddToCart = useToggleCart(id, product?.title);
    const navigate = useNavigate();

    const isInCart = useMemo(() => User.isItemInCart(id), [User.cart]);

    const getProductInfo = async () => {
        try {
            const { data } = await getProduct(id);

            setProduct(data.product);
        } catch (error) {
            toast.error(requestErrorMessage(error));
        }
    };

    const onClickBuy = () => {
        PurchaseProduct.setPurchaseProduct([product]);

        navigate(URL.PURCHASE);
    };

    useEffect(() => {
        getProductInfo();
    }, [id]);

    return (
        <>
            <div className="product-page">
                <div>
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        className="product-page__slider"
                        pagination={true}
                        modules={[Pagination]}
                    >
                        {product?.images.map((image, imageIndex) => (
                            <SwiperSlide key={`image-${imageIndex}`}>
                                <div className="product-page__slider__slide__content">
                                    <img src={image.url} alt={product.title} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="product-page__header">
                        <div>
                            <h2 className="product-page__title">
                                {product?.title}
                            </h2>
                            <h3 className="product-page__manufacturer">
                                Apple inc.
                            </h3>
                        </div>

                        <h3 className="product-page__header__price">
                            {product?.price}$
                        </h3>
                    </div>

                    <div className="product-page__info">
                        <h3 className="product-page__description">
                            {product?.description}
                        </h3>
                    </div>

                    <div className="product-page__actions">
                        <div
                            className={clsx('product-page__actions-cart', {
                                ['added']: isInCart,
                            })}
                        >
                            <CartButton onClick={handleAddToCart} />
                        </div>
                        <Button
                            color="info"
                            variant="contained"
                            onClick={onClickBuy}
                        >
                            Buy
                        </Button>
                    </div>
                </div>
            </div>
            <Helmet>
                <title>
                    {Title.HOME}-{product?.title ?? ''}
                </title>
            </Helmet>
        </>
    );
});
