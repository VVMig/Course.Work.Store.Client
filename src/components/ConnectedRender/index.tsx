import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { toast } from 'react-toastify';
import { URL } from '../../constants/URL';
import { requestErrorMessage } from '../../helpers/errorResponse';
import { getAccessToken, removeTokens } from '../../helpers/tokensHelpers';
import { auth } from '../../services/authApiService';
import { User } from '../../store';
import { AuthRoute } from '../Common/AuthRoute';
import { GlobalDialogs } from '../Common/Dialogs';
import { Footer } from '../Layout/Footer';
import { Header } from '../Layout/Header/Header';
import { Cart } from '../Pages/Cart';
import { Category } from '../Pages/Category';
import { Home } from '../Pages/Home';
import { NotFound } from '../Pages/NotFound';
import { Product } from '../Pages/Product';
import { Profile } from '../Pages/Profile';
import { Purchase } from '../Pages/Purchase';
import { SearchPage } from '../Pages/Search';
import { Users } from '../Pages/Users';
import { VerificationSuccess } from '../Pages/VerificationSuccess';

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

            removeTokens();
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
                    />
                    <Route
                        path={`${URL.CATEGORY}${URL.PRODUCT}`}
                        element={<Product />}
                    />
                    <Route path={URL.CATEGORY} element={<Category />} />
                    <Route
                        path={URL.PURCHASE}
                        element={
                            <AuthRoute isLoading={isLoading}>
                                <Purchase />
                            </AuthRoute>
                        }
                    />
                    <Route
                        path={URL.CART}
                        element={
                            <AuthRoute isLoading={isLoading}>
                                <Cart />
                            </AuthRoute>
                        }
                    />
                    <Route
                        path={URL.VERIFICATION_SUCCESS}
                        element={<VerificationSuccess />}
                    />
                    <Route path={URL.SEARCH} element={<SearchPage />} />
                    <Route path={URL.USERS} element={<Users />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            <Footer />
            <GlobalDialogs />
        </>
    );
});
