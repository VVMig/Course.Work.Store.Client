import { Delete, Edit } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { requestErrorMessage } from '../../../helpers/errorResponse';
import { getAccessToken } from '../../../helpers/tokensHelpers';
import { removeProduct } from '../../../services/productApiService';

interface IProps {
    selectedIds: string[];
    onEditClick: () => void;
    updateUsers: () => void;
}

export const Actions = ({ selectedIds, updateUsers, onEditClick }: IProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const onDeleteProducts = async () => {
        try {
            setIsLoading(true);

            for (let index = 0; index < selectedIds.length; index++) {
                await removeProduct(selectedIds[index], getAccessToken());
            }

            updateUsers();
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
                onClick={onDeleteProducts}
                loading={isLoading}
            >
                Delete
            </LoadingButton>
            {selectedIds.length === 1 && (
                <LoadingButton
                    color="info"
                    variant="contained"
                    startIcon={<Edit />}
                    onClick={onEditClick}
                    loading={isLoading}
                >
                    Edit
                </LoadingButton>
            )}
        </div>
    );
};
