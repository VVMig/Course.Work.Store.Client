import { makeAutoObservable } from 'mobx';
import { INavigation } from './interfaces';

class Bootstrap implements INavigation {
    navItems: string[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setNavItem = (navItems: string[]) => {
        this.navItems = navItems.slice();
    };
}

export default new Bootstrap();
