import axios from 'axios';
import { Endpoints } from '../constants/endpoints';
import { getEndpointUrl } from '../helpers/getEndpointUrl';
import { IProduct } from '../store/interfaces';

export const addProductToCart = (id: string, accessToken: string) => {
    return axios.post<{ cart: IProduct[] }>(
        getEndpointUrl(Endpoints.USER_ADD_CART),
        {
            id,
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
};

export const removeProductFromCart = (id: string, accessToken: string) => {
    return axios.post<{ cart: IProduct[] }>(
        getEndpointUrl(Endpoints.USER_REMOVE_CART),
        {
            id,
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
};
