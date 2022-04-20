import React from 'react';
import { Helmet } from 'react-helmet';
import NotFoundImage from '../../../assets/images/404.jpeg';
import { Title } from '../../../constants/HeaderOptions';

export const NotFound = () => {
    return (
        <>
            <div className="not-found">
                <img src={NotFoundImage} />
            </div>
            <Helmet>
                <title>{Title.NOT_FOUND}</title>
            </Helmet>
        </>
    );
};
