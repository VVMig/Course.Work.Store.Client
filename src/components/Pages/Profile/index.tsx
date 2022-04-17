import { AccountCircle } from '@mui/icons-material';
import { Card, CardContent } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Roles } from '../../../constants/Roles';
import { User } from '../../../store';
import { AdminTools } from './AdminTools';

export const Profile = observer(() => {
    const isAdmin = User.role === Roles.ADMIN;

    console.log(User.role);

    return (
        <>
            <Card className="profile-page">
                <CardContent className="profile-page__content">
                    <div className="profile-page__main-info">
                        <div className="profile-page__icon">
                            <AccountCircle />
                        </div>
                        <div className="profile-page__welcome">
                            Hi,
                            <span className="profile-page__welcome-name">
                                {User.getFullName()}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
            {isAdmin && <AdminTools />}
        </>
    );
});
