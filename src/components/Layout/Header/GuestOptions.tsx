import { Button } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import Dialogs from '../../../store/Dialogs';

export const GuestOptions = observer(() => {
    return (
        <>
            <div className="header__guest-options">
                <Button onClick={Dialogs.toggleLoginDialog}>Sign in</Button>
                <Button onClick={Dialogs.toggleRegisterDialog}>Sign up</Button>
            </div>
        </>
    );
});
