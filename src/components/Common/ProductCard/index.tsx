import { MoreVert } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Roles } from '../../../constants/Roles';
import { URL } from '../../../constants/URL';
import { requestErrorMessage } from '../../../helpers/errorResponse';
import { getAccessToken } from '../../../helpers/tokensHelpers';
import {
    addProductToCart,
    removeProductFromCart,
} from '../../../services/userApiService';
import { User } from '../../../store';
import Dialogs from '../../../store/Dialogs';
import { CartButton } from '../CartButton';
import { AdminOptions } from './AdminOptions';

interface IProps {
    title: string;
    price: number;
    category: string;
    id: string;
    updateProductsList: () => Promise<void>;
}

export const ProductCard = observer(
    ({ title, price, id, category, updateProductsList }: IProps) => {
        const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(
            null
        );

        const handleClick = useCallback(
            (event: React.MouseEvent<HTMLButtonElement>) => {
                event.preventDefault();
                setAnchorEl(event.currentTarget);
            },
            []
        );

        const handleClose = useCallback(
            (event: React.MouseEvent<HTMLButtonElement>) => {
                event?.preventDefault();
                setAnchorEl(null);
            },
            []
        );

        const isInCart = useMemo(() => User.isItemInCart(id), [User.cart]);
        const isAdmin = useMemo(() => User.role === Roles.ADMIN, [User.role]);

        const onClickAddToCart: React.MouseEventHandler<
            HTMLButtonElement
        > = async (e) => {
            e.preventDefault();

            if (!User.isAuth()) {
                Dialogs.toggleLoginDialog();

                toast.info('You need to sign in first');

                return;
            }

            if (isInCart) {
                try {
                    const { data } = await removeProductFromCart(
                        id,
                        getAccessToken()
                    );

                    User.updateCart(data.cart);

                    toast.success(`${title} has been removed from the cart`);
                } catch (error) {
                    toast.error(requestErrorMessage(error));
                }

                return;
            }

            try {
                const { data } = await addProductToCart(id, getAccessToken());

                User.updateCart(data.cart);

                toast.success(`${title} has been added to the cart`);
            } catch (error) {
                toast.error(requestErrorMessage(error));
            }
        };

        return (
            <div className="product-card">
                <Link
                    to={`${URL.CATEGORY}${
                        URL.PRODUCT
                    }?id=${id}&type=${category.toLowerCase()}`}
                >
                    <div className="product-card__container">
                        {isAdmin && (
                            <>
                                <IconButton
                                    className="product-card__admin-options"
                                    onClick={handleClick}
                                >
                                    <MoreVert />
                                </IconButton>
                                <AdminOptions
                                    anchorEl={anchorEl}
                                    handleClose={handleClose}
                                    open={!!anchorEl}
                                    id={id}
                                    productTitle={title}
                                    updateProductsList={updateProductsList}
                                />
                            </>
                        )}
                        <div className="product-card__image">
                            <img src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-family-hero?wid=940&hei=1112&fmt=png-alpha&.v=1644969385433" />
                        </div>
                        <div className="product-card__info">
                            <h3 className="product-card__title">{title}</h3>
                            <h4 className="product-card__manufacturer">
                                Apple
                            </h4>
                            <div
                                className={clsx('product-card__info__footer', {
                                    ['added']: isInCart,
                                })}
                            >
                                <div className="product-card__info__footer__price">
                                    {price}$
                                </div>
                                <CartButton onClick={onClickAddToCart} />
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
);
