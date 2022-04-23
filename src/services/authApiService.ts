import axios from 'axios';
import { Endpoints } from '../constants/endpoints';
import { getEndpointUrl } from '../helpers/getEndpointUrl';
import { IUser } from '../store/interfaces';
import { IAuthResponse, IAuthSignInArgs, IAuthSignUpArgs } from './interfaces';

export const signIn = async ({ email, password }: IAuthSignInArgs) => {
    return axios.post<IAuthResponse>(getEndpointUrl(Endpoints.USER_LOGIN), {
        email,
        password,
    });
};

export const signUp = async ({
    email,
    password,
    firstName,
    lastName,
}: IAuthSignUpArgs) => {
    return axios.post<IAuthResponse>(
        getEndpointUrl(Endpoints.USER_REGISTRATION),
        {
            email,
            password,
            firstName,
            lastName,
        }
    );
};

export const auth = async (accessToken: string) => {
    return axios.get<IUser>(getEndpointUrl(Endpoints.USER_DATA), {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export const refreshToken = (refreshToken: string) => {
    return axios.post<IAuthResponse>(
        getEndpointUrl(Endpoints.USER_REFRESH_TOKEN),
        {
            refreshToken,
        }
    );
};
