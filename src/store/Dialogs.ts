import { makeAutoObservable } from 'mobx';

class Dialogs {
    loginDialog = false;
    registerDialog = false;
    addProductDialog = false;

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
}

export default new Dialogs();
