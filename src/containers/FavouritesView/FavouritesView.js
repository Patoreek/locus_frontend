import React, {useEffect, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext, AccountContext, LoadingContext } from '../../context/AuthContext';


const FavouritesView = () => {

    const [isAuth, setIsAuth] = useContext(AuthContext);
    const [account, setAccount] = useContext(AccountContext);
    const [isLoading, setIsLoading] = useContext(LoadingContext);

    console.log('[FavouritesView] isAuth = ' + isAuth);
    console.log('[FavouritesView] isBusy = ' + isLoading);

    let history = useHistory();

    if (!isLoading){
        console.log('[FavouritesView] isBusy in IF = ' + isLoading);
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