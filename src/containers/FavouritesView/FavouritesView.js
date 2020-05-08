import React, {useEffect, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext, AccountContext, BusyContext } from '../../context/AuthContext';


const FavouritesView = () => {

    const [isAuth, setIsAuth] = useContext(AuthContext);
    const [account, setAccount] = useContext(AccountContext);
    const [isBusy, setIsBusy] = useContext(BusyContext);

    console.log('[FavouritesView] isAuth = ' + isAuth);
    console.log('[FavouritesView] isBusy = ' + isBusy);

    let history = useHistory();

    if (!isBusy){
        console.log('[FavouritesView] isBusy in IF = ' + isBusy);
        console.log('[FavouritesView] isAuth in IF = ' + isAuth);
        if (!isAuth){
            history.replace('/login');
        }
    }

    // useEffect(() => {
        
    // },[])

    return (
        <div>
            <h1> Favourites Section</h1>   
            <h2>{account.username}</h2>
        </div>
    );
};

export default FavouritesView;