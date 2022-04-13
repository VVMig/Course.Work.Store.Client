import { Google } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Endpoints } from '../../../constants/endpoints';
import { StorageKeys } from '../../../constants/storageKeys';

export const GoogleButton = () => {
    const location = useLocation();

    const onAuthGoogle = useCallback(async () => {
        window.open(`${BASE_URL}${Endpoints.USER_GMAIL_AUTH}`, '_self');

        localStorage.setItem(
            StorageKeys.FROM_REDIRECT,
            `${location.pathname}${location.search}`
        );
    }, []);

    return (
        <Button onClick={onAuthGoogle}>
            <Google
                style={{
                    marginRight: 5,
                }}
            />
            Google
        </Button>
    );
};
