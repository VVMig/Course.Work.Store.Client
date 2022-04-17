import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { toast } from 'react-toastify';
import { URL } from '../../constants/URL';
import { requestErrorMessage } from '../../helpers/errorResponse';
import { getAccessToken } from '../../helpers/tokensHelpers';
import { auth } from '../../services/authApiService';
import { User } from '../../store';
import { AuthRoute } from '../Common/AuthRoute';
import { GlobalDialogs } from '../Common/Dialogs';
import { Header } from '../Layout/Header/Header';
import { Category } from '../Pages/Category';
import { Home } from '../Pages/Home';
import { Product } from '../Pages/Product';
import { Profile } from '../Pages/Profile';

export const ConnectedRender = observer(() => {
    const [isLoading, setIsLoading] = useState(true);

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

        setIsLoading(false);
    }, []);

    useEffect(() => {
        authUser();
    }, []);

    return (
        <>
            <Header />
            <div className="container">
                <Routes>
                    <Route path={URL.HOME} element={<Home />} />
                    <Route
                        path={URL.PROFILE}
                        element={
                            <AuthRoute isLoading={isLoading}>
                                <Profile />
                            </AuthRoute>
                        }
                    ></Route>

                    <Route
                        path={`${URL.CATEGORY}${URL.PRODUCT}`}
                        element={<Product />}
                    />
                    <Route path={URL.CATEGORY} element={<Category />} />
                    <Route path="*" element={<>Not found</>} />
                </Routes>
            </div>
            <GlobalDialogs />
        </>
    );
});
