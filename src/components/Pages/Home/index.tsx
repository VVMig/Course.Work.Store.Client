import React, { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { StorageKeys } from '../../../constants/storageKeys';
import { URL } from '../../../constants/URL';
import { saveTokens } from '../../../helpers/tokensHelpers';
import { useQuery } from '../../../hooks/useQueryParams';
import { IAuthResponse } from '../../../services/interfaces';
import { User } from '../../../store';

export const Home = () => {
    const query = useQuery();
    const navigation = useNavigate();

    const credentials = useMemo(() => query.get('credentials'), [query]);

    const loginUserByCredentials = useCallback(() => {
        try {
            const userData = JSON.parse(credentials) as IAuthResponse;

            if (userData.accessToken && userData.refreshToken) {
                saveTokens(userData.accessToken, userData.refreshToken);
            }

            User.loginUser(userData?.user);

            const path =
                localStorage.getItem(StorageKeys.FROM_REDIRECT) ?? URL.HOME;

            localStorage.removeItem(StorageKeys.FROM_REDIRECT);

            navigation(path);
        } catch (error) {
            toast.error(error?.message);
        }
    }, [credentials]);

    useEffect(() => {
        if (credentials) {
            loginUserByCredentials();
        }
    }, [credentials]);

    return <>123</>;
};
