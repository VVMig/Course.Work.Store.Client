import { Button } from '@mui/material';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { URL } from '../../../../constants/URL';
import { requestErrorMessage } from '../../../../helpers/errorResponse';
import { getCategories } from '../../../../services/bootstrapApiService';
import { Bootstrap } from '../../../../store';

export const Navigation = observer(() => {
    const location = useLocation();

    const initialRequest = async () => {
        try {
            const { data } = await getCategories();

            Bootstrap.setNavItem(data.categories);
        } catch (error) {
            toast.error(requestErrorMessage(error));
        }
    };

    const isLinkActive = (navItem: string) =>
        !!location.search.match(new RegExp(navItem, 'i'))?.length;

    useEffect(() => {
        initialRequest();
    }, []);

    return (
        <nav className="nav-menu">
            {Bootstrap.navItems.map((navItem) => (
                <Link
                    key={navItem}
                    to={`${URL.CATEGORY}?type=${navItem.toLowerCase()}`}
                    className={clsx('nav-menu__link', {
                        ['nav-menu__link-active']: isLinkActive(navItem),
                    })}
                >
                    <Button size="large">{navItem}</Button>
                </Link>
            ))}
        </nav>
    );
});
