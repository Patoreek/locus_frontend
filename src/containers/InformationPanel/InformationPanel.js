import React, { useContext } from 'react';

import GuestPanel from './GuestPanel/GuestPanel';
import UserPanel from './UserPanel/UserPanel';

import { AuthContext } from '../../context/AuthContext';

import classes from './InformationPanel.module.css';

const InformationPanel = (props) => {

    const [isAuth, setIsAuth] = useContext(AuthContext);

    return (
        <div className={classes.infoPanelContainer}>

            {!isAuth && (
                <GuestPanel/>
            )}
            {isAuth && (
                <UserPanel/>
            )}


        </div>
    );
};

export default InformationPanel;