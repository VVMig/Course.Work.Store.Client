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

    findProperCatefory = (findCategory: string) =>
        this.navItems.find(
            (category) => category.toLowerCase() === findCategory.toLowerCase()
        );
}

export default new Bootstrap();
