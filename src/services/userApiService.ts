import axios from 'axios';
import { Endpoints } from '../constants/endpoints';
import { Roles } from '../constants/Roles';
import { getEndpointUrl } from '../helpers/getEndpointUrl';
import { IProduct, IUser } from '../store/interfaces';
import { IPurchaseBody } from './interfaces';

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

export const purchase = (body: IPurchaseBody, accessToken: string) => {
    return axios.post<IProduct[]>(
        getEndpointUrl(Endpoints.USER_PURCHASE),
        body,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
};

export const getUsersList = (
    pageNumber: number | null,
    accessToken: string
) => {
    return axios.get<{ users: IUser[]; totalCounts: number }>(
        `${getEndpointUrl(Endpoints.USER_USERS)}${
            pageNumber ? `?page=${pageNumber}` : ''
        }`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
};

export const changeUsersRole = (
    body: {
        userIds: string[];
        role: Roles;
    },
    accessToken: string
) => {
    return axios.put<IUser[]>(`${getEndpointUrl(Endpoints.USER_ROLE)}`, body, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export const deleteUsers = (
    body: {
        userIds: string[];
    },
    accessToken: string
) => {
    return axios.post<string[]>(getEndpointUrl(Endpoints.USER_DELETE), body, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};
