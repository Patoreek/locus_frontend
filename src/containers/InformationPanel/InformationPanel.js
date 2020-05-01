import React, { useContext } from 'react';

import UserPanel from './UserPanel/UserPanel';
import AdminPanel from './AdminPanel/AdminPanel';

import { AuthContext } from '../../context/AuthContext';

import classes from './InformationPanel.module.css';

const InformationPanel = (props) => {

    const [isAuth, setIsAuth] = useContext(AuthContext);

    return (
        <div className={classes.infoPanelContainer}>

            {!isAuth && (
                <UserPanel/>
            )}
            {isAuth && (
                <AdminPanel/>
            )}


        </div>
    );
};

export default InformationPanel;