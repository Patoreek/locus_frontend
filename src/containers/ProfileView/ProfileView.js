import React, {useEffect, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext, BusyContext } from '../../context/AuthContext';

const ProfileView = () => {

    const [isAuth, setIsAuth] = useContext(AuthContext);
    const [isBusy, setIsBusy] = useContext(BusyContext);

    let history = useHistory();

    if (!isBusy){
        console.log('[UserView] isBusy in IF = ' + isBusy);
        console.log('[UserView] isAuth in IF = ' + isAuth);
        if (!isAuth){
            history.replace('/login');
        }
    }


    return (
        <div>
            <h1>Profile Section</h1>
        </div>
    );
};

export default ProfileView;