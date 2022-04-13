import { StorageKeys } from '../constants/storageKeys';

export const saveTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem(StorageKeys.ACCESS_TOKEN, accessToken);
    localStorage.setItem(StorageKeys.REFRESH_TOKEN, refreshToken);
};

export const removeTokens = () => {
    localStorage.removeItem(StorageKeys.ACCESS_TOKEN);
    localStorage.removeItem(StorageKeys.REFRESH_TOKEN);
};

export const getAccessToken = () =>
    localStorage.getItem(StorageKeys.ACCESS_TOKEN);

export const getRefreshToken = () =>
    localStorage.getItem(StorageKeys.REFRESH_TOKEN);
