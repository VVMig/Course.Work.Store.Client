import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { URL } from '../../../constants/URL';

export const VerificationSuccess = observer(() => {
    useEffect(() => {
        toast.success('Email has been verified');
    }, []);

    return <Navigate to={URL.HOME} />;
});
