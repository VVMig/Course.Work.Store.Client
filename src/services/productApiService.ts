import axios from 'axios';
import { Endpoints } from '../constants/endpoints';
import { getEndpointUrl } from '../helpers/getEndpointUrl';
import { IProduct } from '../store/interfaces';
import { IAddProductBody } from './interfaces';

export const addProduct = (body: IAddProductBody, accessToken: string) => {
    return axios.post(getEndpointUrl(Endpoints.PRODUCT_ADD), body, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export const getProductsByCategory = (category: string) => {
    return axios.get<IProduct[]>(
        `${getEndpointUrl(Endpoints.PRODUCT_CATEGORY)}?category=${category}`
    );
};

export const removeProduct = (id: string, accessToken: string) => {
    return axios.post(
        getEndpointUrl(Endpoints.PRODUCT_REMOVE),
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
