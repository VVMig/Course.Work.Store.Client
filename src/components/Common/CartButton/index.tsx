import { LocalMall } from '@mui/icons-material';
import { Badge, IconButton } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { URL } from '../../../constants/URL';
import { User } from '../../../store';

interface IProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const CartButton = observer(({ onClick }: IProps) => {
    return onClick ? (
        <IconButton onClick={onClick}>
            <LocalMall />
        </IconButton>
    ) : (
        <Link to={URL.CART} className="cart">
            <IconButton>
                <Badge badgeContent={User.cart.length ?? 0} color="primary">
                    <LocalMall />
                </Badge>
            </IconButton>
        </Link>
    );
});
