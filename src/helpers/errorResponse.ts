import { AxiosError } from 'axios';

export const requestErrorMessage = (error: AxiosError): string => {
    if (error?.isAxiosError) {
        return error.response?.data?.message;
    }

    return error?.message;
};
