import React, { useContext, useEffect, useState } from 'react';

import GuestPanel from './GuestPanel/GuestPanel';
import UserPanel from './UserPanel/UserPanel';

import { AuthContext, UserOnMapContext } from '../../context/AuthContext';

import classes from './InformationPanel.module.css';

const InformationPanel = (props) => {

    const [isAuth, setIsAuth] = useContext(AuthContext);
    const [isUserOnMap, setIsUserOnMap] = useContext(UserOnMapContext);

    const [guestPanel, setGuestPanel] = useState(true);
    const [panelLoaded, setPanelLoaded] = useState(false)


    useEffect(() => {
        console.log('[InfoPanel] isAuth = ' + isAuth);
        console.log('[InfoPanel] isUserOnMap = ' + isUserOnMap);

        if (isAuth) { // IS LOGGED IN 
            console.log('[InfoPanel] in isAuth block');
            if (!isUserOnMap) { // NOT ON MAP
                setGuestPanel(false);
            }
        }

        setPanelLoaded(true);

    },[]);

    return (
        <div className={classes.infoPanelContainer}>

            {panelLoaded && guestPanel && (
                <GuestPanel/>
            )}
            {panelLoaded && !guestPanel && (
                <UserPanel/>
            )}

        </div>
    );
};

export default InformationPanel;