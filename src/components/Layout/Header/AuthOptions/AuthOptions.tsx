import { Logout, Person } from '@mui/icons-material';
import { Avatar, Menu, MenuItem } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { removeTokens } from '../../../../helpers/tokensHelpers';
import { User } from '../../../../store';
import { CartButton } from '../../../Common/CartButton';

export const AuthOptions = observer(() => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu: React.MouseEventHandler<HTMLDivElement> = (
        event
    ) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const onClickLogout = () => {
        User.logoutUser();
        removeTokens();

        handleCloseUserMenu();
    };

    return (
        <div className="auth-options">
            <CartButton />

            <Avatar
                style={{
                    cursor: 'pointer',
                }}
                onClick={handleOpenUserMenu}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
            >
                <Person />
            </Avatar>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleCloseUserMenu}>
                    <Person />
                    Profile
                </MenuItem>
                <MenuItem onClick={onClickLogout}>
                    <Logout />
                    Sign out
                </MenuItem>
            </Menu>
        </div>
    );
});
