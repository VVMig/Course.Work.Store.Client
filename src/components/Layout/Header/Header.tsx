import { observer } from 'mobx-react-lite';
import React from 'react';
import '../../../scss/Layout/Header.scss';
import { User } from '../../../store';
import { AuthOptions } from './AuthOptions/AuthOptions';
import { GuestOptions } from './GuestOptions';
import { MainLogo } from './MainLogo';
import { Navigation } from './Navigation/Navigation';
import { Search } from './Search';

export const Header = observer(() => {
    return (
        <header className="header">
            <div className="header__left">
                <MainLogo />
                <Navigation />
            </div>
            <Search />
            <div className="header__right">
                {User.isAuth() ? <AuthOptions /> : <GuestOptions />}
            </div>
        </header>
    );
});
