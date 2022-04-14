import axios from 'axios';
import { Endpoints } from '../constants/endpoints';
import { getEndpointUrl } from '../helpers/getEndpointUrl';

export const getCategories = () => {
    return axios.get<{ categories: string[] }>(
        getEndpointUrl(Endpoints.PRODUCT_CATEGORIES)
    );
};
