import { DataGrid, GridColDef } from '@mui/x-data-grid';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { URL } from '../../../constants/URL';
import { requestErrorMessage } from '../../../helpers/errorResponse';
import { getAccessToken } from '../../../helpers/tokensHelpers';
import { getUsersList } from '../../../services/userApiService';
import { IUser } from '../../../store/interfaces';
import { Actions } from './Actions';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 230 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: 'email',
        headerName: 'Email',
        width: 250,
    },
    {
        field: 'role',
        headerName: 'Role',
        width: 160,
    },
    {
        field: 'lastLogin',
        headerName: 'Last login',
        width: 160,
    },
];

const mapUsers = (user: IUser) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    lastLogin: moment(user.lastLogin).format('DD.MM.YYYY HH:mm:ss'),
});

export const Users = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [totalCounts, setTotalCounts] = useState(0);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const navigate = useNavigate();

    const getUsers = (hotUpdate: boolean) => async () => {
        if (users.length === totalCounts && totalCounts && !hotUpdate) {
            return;
        }

        try {
            setIsLoading(true);

            const { data } = await getUsersList(page, getAccessToken());

            if (hotUpdate) {
                setUsers(data.users);
            } else {
                setUsers(users.concat(data.users));
            }

            if (!totalCounts || hotUpdate) {
                setTotalCounts(data.totalCounts);
                setPage(1);
            }
        } catch (error) {
            toast.error(requestErrorMessage(error));

            navigate(URL.HOME);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getUsers(false)();
    }, [page]);

    const onSelectRow = (tableSelections: string[]) => {
        setSelectedIds(tableSelections);
    };

    const onChangePage = (changePageNumber: number) => {
        setPage(changePageNumber + 1);
    };

    return (
        <div className="users-page">
            {!!selectedIds.length && (
                <Actions
                    updateUsers={getUsers(true)}
                    selectedIds={selectedIds}
                />
            )}
            <DataGrid
                columns={columns}
                pageSize={10}
                page={page - 1}
                checkboxSelection
                rows={users.map(mapUsers)}
                rowCount={totalCounts}
                autoHeight={true}
                loading={isLoading}
                onSelectionModelChange={onSelectRow}
                onPageChange={onChangePage}
                autoPageSize={false}
            />
        </div>
    );
};
