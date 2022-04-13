import { observer } from 'mobx-react-lite';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../scss/index.scss';
import { ConnectedRender } from '../ConnectedRender';

export const App = observer(() => {
    return (
        <Router>
            <ConnectedRender />
            <ToastContainer />
        </Router>
    );
});
