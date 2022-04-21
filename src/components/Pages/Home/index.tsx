import React, { useCallback, useEffect, useMemo, useReducer } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Autoplay, EffectCards, Pagination } from 'swiper';
import 'swiper/css/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import AppleWatch7SeveralImage from '../../../assets/images/apple-watch-7-home.webp';
import AppleWatch7Image from '../../../assets/images/apple-watch-series-7.webp';
import AirPodsProImage from '../../../assets/images/AppleAirPodsPro.jpeg';
import Iphone13PromoImage from '../../../assets/images/iphone-13-home.jpeg';
import { Title } from '../../../constants/HeaderOptions';
import { StorageKeys } from '../../../constants/storageKeys';
import { URL } from '../../../constants/URL';
import { requestErrorMessage } from '../../../helpers/errorResponse';
import { saveTokens } from '../../../helpers/tokensHelpers';
import { useQuery } from '../../../hooks/useQueryParams';
import { IAuthResponse } from '../../../services/interfaces';
import {
    getNewProducts,
    getPopularProducts,
} from '../../../services/productApiService';
import { User } from '../../../store';
import { IProduct } from '../../../store/interfaces';
import { ProductSection } from './ProductSection';

const newProductsRequestLimit = 4;

interface IState {
    newProducts: IProduct[];
    popularProducts: IProduct[];
    isNewProductsPending: boolean;
    isPopularProductsPending: boolean;
}

interface IAction {
    type: string;
    payload: any;
}

enum Actions {
    SET_NEW_PRODUCTS = 'SET_NEW_PRODUCTS',
    SET_NEW_PRODUCTS_PENDING = 'SET_NEW_PRODUCTS_PENDING',
    SET_POPULAR_PRODUCTS = 'SET_POPULAR_PRODUCTS',
    SET_POPULAR_PRODUCTS_PENDING = 'SET_POPULAR_PRODUCTS_PENDING',
}

const initialState: IState = {
    newProducts: [],
    popularProducts: [],
    isNewProductsPending: false,
    isPopularProductsPending: false,
};

const reducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
        case Actions.SET_NEW_PRODUCTS:
            return {
                ...state,
                newProducts: action.payload,
            };
        case Actions.SET_NEW_PRODUCTS_PENDING:
            return {
                ...state,
                isNewProductsPending: action.payload,
            };
        case Actions.SET_POPULAR_PRODUCTS:
            return {
                ...state,
                popularProducts: action.payload,
            };
        case Actions.SET_POPULAR_PRODUCTS_PENDING:
            return {
                ...state,
                isPopularProductsPending: action.payload,
            };
        default:
            return state;
    }
};

export const Home = () => {
    const query = useQuery();
    const navigation = useNavigate();
    const [state, dispatch] = useReducer(reducer, initialState);

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
            toast.error(requestErrorMessage(error));
        }
    }, [credentials]);

    const getNewProductsRequest = async () => {
        try {
            dispatch({
                type: Actions.SET_NEW_PRODUCTS_PENDING,
                payload: true,
            });

            const { data } = await getNewProducts(newProductsRequestLimit);

            dispatch({
                type: Actions.SET_NEW_PRODUCTS,
                payload: data,
            });
        } catch (error) {
            toast.error(requestErrorMessage(error));
        } finally {
            dispatch({
                type: Actions.SET_NEW_PRODUCTS_PENDING,
                payload: false,
            });
        }
    };

    const getPopularProductsRequest = async () => {
        try {
            dispatch({
                type: Actions.SET_POPULAR_PRODUCTS_PENDING,
                payload: true,
            });

            const { data } = await getPopularProducts();

            dispatch({
                type: Actions.SET_POPULAR_PRODUCTS,
                payload: data,
            });
        } catch (error) {
            toast.error(requestErrorMessage(error));
        } finally {
            dispatch({
                type: Actions.SET_POPULAR_PRODUCTS_PENDING,
                payload: false,
            });
        }
    };

    useEffect(() => {
        if (credentials) {
            loginUserByCredentials();
        }
    }, [credentials]);

    useEffect(() => {
        getNewProductsRequest();
        getPopularProductsRequest();
    }, []);

    return (
        <>
            <div className="home-page">
                <Swiper
                    effect="cards"
                    grabCursor
                    slidesPerView={1}
                    className="home-page__slider"
                    pagination={true}
                    modules={[Pagination, EffectCards, Autoplay]}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    loop
                >
                    <SwiperSlide>
                        <div className="home-page__slider__content">
                            <img src={Iphone13PromoImage} alt="Iphone 13" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="home-page__slider__content">
                            <img src={AirPodsProImage} alt="Iphone 13" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="home-page__slider__content">
                            <img src={AppleWatch7Image} alt="Apple Watch 7" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="home-page__slider__content">
                            <img
                                src={AppleWatch7SeveralImage}
                                alt="Apple Watch 7"
                            />
                        </div>
                    </SwiperSlide>
                </Swiper>
                <ProductSection
                    isLoading={state.isNewProductsPending}
                    products={state.newProducts}
                    updateProductsRequest={getNewProductsRequest}
                    title="Our new arrivals"
                />
                <ProductSection
                    isLoading={state.isPopularProductsPending}
                    products={state.popularProducts}
                    updateProductsRequest={getPopularProductsRequest}
                    title="Best sales"
                />
            </div>
            <Helmet>
                <title>{Title.HOME}</title>
            </Helmet>
        </>
    );
};
