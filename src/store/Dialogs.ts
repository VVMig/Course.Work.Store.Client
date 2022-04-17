import { makeAutoObservable } from 'mobx';

class Dialogs {
    loginDialog = false;
    registerDialog = false;
    addProductDialog = false;
    confirmDialog = false;

    constructor() {
        makeAutoObservable(this);
    }

    toggleLoginDialog = () => {
        this.loginDialog = !this.loginDialog;
    };

    toggleRegisterDialog = () => {
        this.registerDialog = !this.registerDialog;
    };

    toggleAddProductDialog = () => {
        this.addProductDialog = !this.addProductDialog;
    };

    toggleConfirmDialog = () => {
        console.log('1');
        this.confirmDialog = !this.confirmDialog;
    };
}

export default new Dialogs();
