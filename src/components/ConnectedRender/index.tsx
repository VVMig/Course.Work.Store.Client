import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { toast } from 'react-toastify';
import { URL } from '../../constants/URL';
import { requestErrorMessage } from '../../helpers/errorResponse';
import { getAccessToken } from '../../helpers/tokensHelpers';
import { auth } from '../../services/authApiService';
import { User } from '../../store';
import { Header } from '../Layout/Header/Header';
import { Home } from '../Pages/Home';

export const ConnectedRender = observer(() => {
    const authUser = useCallback(async () => {
        const accessToken = getAccessToken();

        if (!accessToken) {
            User.logoutUser();

            return;
        }

        try {
            const { data } = await auth(accessToken);

            User.loginUser(data);
        } catch (error) {
            toast.error(requestErrorMessage(error));
        }
    }, []);

    useEffect(() => {
        authUser();
    }, []);

    return (
        <>
            <Header />
            <Routes>
                <Route path={URL.HOME} element={<Home />} />
            </Routes>
        </>
    );
});
