import React from 'react';
import { Link } from 'react-router-dom';
import { URL } from '../../../constants/URL';

export const MainLogo = React.memo(() => {
    return (
        <Link className="main-logo" to={URL.HOME}>
            VVMig
        </Link>
    );
});

MainLogo.displayName = 'MainLogo';
