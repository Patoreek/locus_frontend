import React, {useEffect, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext, LoadingContext } from '../../context/AuthContext';

const ProfileView = () => {

    const [isAuth, setIsAuth] = useContext(AuthContext);
    const [isLoading, setIsLoading] = useContext(LoadingContext);

    let history = useHistory();

    if (!isLoading){
        console.log('[UserView] isBusy in IF = ' + isLoading);
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