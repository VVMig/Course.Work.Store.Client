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

export const editProduct = (
    body: IAddProductBody & { id: string },
    accessToken: string
) => {
    return axios.put(getEndpointUrl(Endpoints.PRODUCT_EDIT), body, {
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

export const getProduct = (id: string) => {
    return axios.get<{ product: IProduct }>(
        `${getEndpointUrl(Endpoints.PRODUCT_PRODUCT)}?id=${id}`
    );
};

export const searchProducts = (text: string) => {
    return axios.get<IProduct[]>(
        `${getEndpointUrl(Endpoints.PRODUCT_SEARCH)}?text=${text}`
    );
};

export const getNewProducts = (limit: number) => {
    return axios.get<IProduct[]>(
        `${getEndpointUrl(Endpoints.PRODUCT_NEW)}?limit=${limit}`
    );
};

export const getAllProducts = (page: number, accessToken: string) => {
    return axios.get<{ products: IProduct[]; totalCounts: number }>(
        `${getEndpointUrl(Endpoints.PRODUCT_ALL)}?page=${page}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
};
