import { AddCircleOutline, Dashboard, Group } from '@mui/icons-material';
import { Card, CardContent } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { URL } from '../../../../constants/URL';
import Dialogs from '../../../../store/Dialogs';

export const AdminTools = observer(() => {
    const navigate = useNavigate();

    return (
        <Card className="admin-tools">
            <CardContent>
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
                    <Card
                        className="admin-tools__add-product"
                        onClick={() => navigate(URL.PRODUCTS)}
                    >
                        <h3>Products Dashboard</h3>
                        <CardContent>
                            <Dashboard fontSize="large" />
                        </CardContent>
                    </Card>
                    <Card
                        className="admin-tools__add-product"
                        onClick={() => navigate(URL.USERS)}
                    >
                        <h3>Users Dashboard</h3>
                        <CardContent>
                            <Group fontSize="large" />
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
    );
});
