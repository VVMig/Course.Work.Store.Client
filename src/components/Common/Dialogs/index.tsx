import { observer } from 'mobx-react-lite';
import React from 'react';
import Dialogs from '../../../store/Dialogs';
import { AddProductDialog } from './AddProductDialog';
import { SignInDialog } from './SignInDialog';
import { SignUpDialog } from './SignUpDialog';

export const GlobalDialogs = observer(() => {
    return (
        <>
            <AddProductDialog
                isOpen={Dialogs.addProductDialog}
                handleClose={Dialogs.toggleAddProductDialog}
            />
            <SignInDialog
                isOpen={Dialogs.loginDialog}
                handleClose={Dialogs.toggleLoginDialog}
            />
            <SignUpDialog
                isOpen={Dialogs.registerDialog}
                handleClose={Dialogs.toggleRegisterDialog}
            />
        </>
    );
});
