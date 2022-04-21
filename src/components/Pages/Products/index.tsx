import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { URL } from '../../../constants/URL';
import { requestErrorMessage } from '../../../helpers/errorResponse';
import { getAccessToken } from '../../../helpers/tokensHelpers';
import { getAllProducts } from '../../../services/productApiService';
import { IProduct } from '../../../store/interfaces';
import { EditProductDialog } from '../../Common/Dialogs/EditProductDialog';
import { Actions } from './Actions';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'title', headerName: 'Title', width: 220 },
    { field: 'price', headerName: 'Price', width: 130 },
    {
        field: 'amount',
        headerName: 'Amount',
        width: 80,
    },
    {
        field: 'category',
        headerName: 'Category',
        width: 80,
    },
];

const mapProducts = (product: IProduct) => ({
    id: product.id,
    title: product.title,
    price: product.price,
    amount: product.amount,
    category: product.category,
});

export const Products = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [totalCounts, setTotalCounts] = useState(0);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const navigate = useNavigate();

    const onToggleEditDialog = useCallback(() => {
        setIsEditDialogOpen((prev) => !prev);
    }, []);

    const getProducts = (hotUpdate: boolean) => async () => {
        if (products.length === totalCounts && totalCounts && !hotUpdate) {
            return;
        }

        try {
            setIsLoading(true);

            const { data } = await getAllProducts(page, getAccessToken());

            if (hotUpdate) {
                setProducts(data.products);
            } else {
                setProducts(products.concat(data.products));
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
        getProducts(false)();
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
                    updateUsers={getProducts(true)}
                    selectedIds={selectedIds}
                    onEditClick={onToggleEditDialog}
                />
            )}
            <DataGrid
                columns={columns}
                pageSize={10}
                page={page - 1}
                checkboxSelection
                rows={products.map(mapProducts)}
                rowCount={totalCounts}
                autoHeight={true}
                loading={isLoading}
                onSelectionModelChange={onSelectRow}
                onPageChange={onChangePage}
                autoPageSize={false}
            />
            {selectedIds.length === 1 && (
                <EditProductDialog
                    isOpen={isEditDialogOpen}
                    handleClose={onToggleEditDialog}
                    product={products.find(
                        (product) => product.id === selectedIds[0]
                    )}
                    updateProductsList={getProducts(true)}
                />
            )}
        </div>
    );
};
