import { Menu, MenuItem } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { requestErrorMessage } from '../../../helpers/errorResponse';
import { getAccessToken } from '../../../helpers/tokensHelpers';
import { removeProduct } from '../../../services/productApiService';
import { IProduct } from '../../../store/interfaces';
import { ConfirmDialog } from '../Dialogs/ConfirmDialog';
import { EditProductDialog } from '../Dialogs/EditProductDialog';

interface IProps {
    anchorEl?: Element | ((element: Element) => Element);
    open: boolean;
    productTitle: string;
    id: string;
    product: IProduct;
    handleClose?: (event?: React.MouseEvent) => void;
    updateProductsList: () => Promise<void> | void;
}

export const AdminOptions = observer(
    ({
        anchorEl,
        open,
        handleClose,
        productTitle,
        id,
        updateProductsList,
        product,
    }: IProps) => {
        const [isLoading, setIsLoading] = useState(false);
        const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
        const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

        const toggleConfirmationDialog = useCallback((e?: React.MouseEvent) => {
            e?.preventDefault();

            setIsConfirmDialogOpen((prev) => !prev);
            handleClose();
        }, []);

        const toggleEditDialog = useCallback((e?: React.MouseEvent) => {
            e?.preventDefault();

            setIsEditDialogOpen((prev) => !prev);
            handleClose();
        }, []);

        const onClickRemove = async () => {
            if (isLoading) {
                return;
            }

            setIsLoading(true);

            toast.loading('Loading...', {
                toastId: 'loading',
            });

            try {
                await removeProduct(id, getAccessToken());

                await updateProductsList();

                toggleConfirmationDialog();

                toast.dismiss('loading');

                toast.success(`${productTitle} has been removed`);
            } catch (error) {
                toast.error(requestErrorMessage(error));
            } finally {
                setIsLoading(false);
            }
        };

        return (
            <>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={toggleEditDialog}>Edit Product</MenuItem>
                    <MenuItem onClick={toggleConfirmationDialog}>
                        Remove Product
                    </MenuItem>
                </Menu>
                <ConfirmDialog
                    onPositiveChoice={onClickRemove}
                    isOpen={isConfirmDialogOpen}
                    handleClose={toggleConfirmationDialog}
                    title={`Remove ${productTitle}?`}
                />
                <EditProductDialog
                    isOpen={isEditDialogOpen}
                    handleClose={toggleEditDialog}
                    product={product}
                    updateProductsList={updateProductsList}
                />
            </>
        );
    }
);
