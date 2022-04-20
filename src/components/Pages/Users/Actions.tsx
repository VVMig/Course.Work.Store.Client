import { Delete, GroupAdd } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Menu, MenuItem } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { Roles } from '../../../constants/Roles';
import { requestErrorMessage } from '../../../helpers/errorResponse';
import { getAccessToken } from '../../../helpers/tokensHelpers';
import { changeUsersRole, deleteUsers } from '../../../services/userApiService';

interface IProps {
    selectedIds: string[];
    updateUsers: () => void;
}

export const Actions = ({ selectedIds, updateUsers }: IProps) => {
    const [anchorChangeRoleBtn, setAnchorChangeRoleBtn] =
        React.useState<null | HTMLElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    const isOpen = useMemo(() => !!anchorChangeRoleBtn, [anchorChangeRoleBtn]);

    const onClickChangeRole = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorChangeRoleBtn(event.currentTarget);
    };

    const onCloseChangeRoleMenu = () => {
        setAnchorChangeRoleBtn(null);
    };

    const onSelectRole = (role: Roles) => async () => {
        try {
            setIsLoading(true);

            await changeUsersRole(
                {
                    userIds: selectedIds,
                    role,
                },
                getAccessToken()
            );

            updateUsers();

            onCloseChangeRoleMenu();
        } catch (error) {
            toast.error(requestErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    };

    const onDeleteUsers = async () => {
        try {
            setIsLoading(true);

            await deleteUsers(
                {
                    userIds: selectedIds,
                },
                getAccessToken()
            );

            updateUsers();

            onCloseChangeRoleMenu();
        } catch (error) {
            toast.error(requestErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="users-page__actions">
            <LoadingButton
                color="error"
                variant="contained"
                startIcon={<Delete />}
                onClick={onDeleteUsers}
                loading={isLoading}
            >
                Delete
            </LoadingButton>
            <LoadingButton
                color="info"
                variant="contained"
                startIcon={<GroupAdd />}
                aria-controls={isOpen ? 'change-role-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isOpen ? 'true' : undefined}
                onClick={onClickChangeRole}
                loading={isLoading}
            >
                Change Role
            </LoadingButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorChangeRoleBtn}
                open={isOpen}
                onClose={onCloseChangeRoleMenu}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={onSelectRole(Roles.ADMIN)}>
                    {Roles.ADMIN}
                </MenuItem>
                <MenuItem onClick={onSelectRole(Roles.USER)}>
                    {Roles.USER}
                </MenuItem>
            </Menu>
        </div>
    );
};
