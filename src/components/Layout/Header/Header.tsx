import { observer } from 'mobx-react-lite';
import React from 'react';
import '../../../scss/Layout/Header.scss';
import { User } from '../../../store';
import { AuthOptions } from './AuthOptions';
import { GuestOptions } from './GuestOptions';

export const Header = observer(() => {
    return (
        <header className="header">
            {User.isAuth() ? <AuthOptions /> : <GuestOptions />}
        </header>
    );
});
