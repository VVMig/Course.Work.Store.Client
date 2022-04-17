import { AddCircleOutline } from '@mui/icons-material';
import { Card, CardContent } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import Dialogs from '../../../../store/Dialogs';

export const AdminTools = observer(() => {
    return (
        <div className="admin-tools">
            <h2>Admin Tools</h2>
            <div className="admin-tools__list">
                <Card
                    className="admin-tools__add-product"
                    onClick={Dialogs.toggleAddProductDialog}
                >
                    <h3>Add Product</h3>
                    <CardContent>
                        <AddCircleOutline fontSize="large" />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
});
