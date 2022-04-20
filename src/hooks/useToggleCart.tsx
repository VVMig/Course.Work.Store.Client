import { useMemo } from 'react';
import { toast } from 'react-toastify';
import { requestErrorMessage } from '../helpers/errorResponse';
import { getAccessToken } from '../helpers/tokensHelpers';
import {
    addProductToCart,
    removeProductFromCart,
} from '../services/userApiService';
import { User } from '../store';
import Dialogs from '../store/Dialogs';

export const useToggleCart = (id: string, title: string) => {
    const isInCart = useMemo(() => User.isItemInCart(id), [User.cart]);

    const onClickAddToCart: React.MouseEventHandler<HTMLButtonElement> = async (
        e
    ) => {
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

    return onClickAddToCart;
};
