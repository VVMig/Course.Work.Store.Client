import { Delete, MoreVert } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Roles } from '../../../constants/Roles';
import { URL } from '../../../constants/URL';
import { useToggleCart } from '../../../hooks/useToggleCart';
import { User } from '../../../store';
import { CartButton } from '../CartButton';
import { AdminOptions } from './AdminOptions';

interface IProps {
    title: string;
    price: number;
    category: string;
    id: string;
    briefInformation: string;
    isCart?: boolean;
    imageSrc?: string;
    updateProductsList?: () => Promise<void>;
}

export const ProductCard = observer(
    ({
        title,
        price,
        id,
        category,
        updateProductsList,
        briefInformation,
        isCart,
        imageSrc,
    }: IProps) => {
        const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(
            null
        );

        const handleAddToCart = useToggleCart(id, title);

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

        return (
            <div className="product-card">
                <Link
                    to={`${URL.CATEGORY}${
                        URL.PRODUCT
                    }?id=${id}&type=${category.toLowerCase()}`}
                >
                    <div className="product-card__container">
                        {isAdmin && !isCart && (
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
                        <div
                            className="product-card__image"
                            style={{
                                backgroundImage: `url(${imageSrc})`,
                            }}
                        />
                        <div className="product-card__info">
                            <h3 className="product-card__title">{title}</h3>
                            <h4 className="product-card__manufacturer">
                                {briefInformation}
                            </h4>
                            <div
                                className={clsx('product-card__info__footer', {
                                    ['added']: isInCart,
                                })}
                            >
                                <div className="product-card__info__footer__price">
                                    {price}$
                                </div>
                                {isCart ? (
                                    <IconButton onClick={handleAddToCart}>
                                        <Delete />
                                    </IconButton>
                                ) : (
                                    <CartButton onClick={handleAddToCart} />
                                )}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
);
