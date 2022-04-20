import { observer } from 'mobx-react-lite';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { URL } from '../../../constants/URL';
import { User } from '../../../store';
import Dialogs from '../../../store/Dialogs';

interface IProps {
    isLoading: boolean;
}

export const AuthRoute: React.FC<IProps> = observer(
    ({ children, isLoading }): React.ReactElement | null => {
        if (!User.isAuth() && !isLoading) {
            toast.info('Please sign up');

            Dialogs.toggleLoginDialog();

            return <Navigate to={URL.HOME} replace />;
        }

        return children as React.ReactElement;
    }
);
