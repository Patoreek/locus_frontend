import React, {useEffect, useContext, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext, 
         AccountContext, 
         FavouritesContext,
         GetFavouritesContext } from '../../context/AuthContext';

import FavouritesList from './FavouritesList/FavouritesList';


const FavouritesView = () => {

    const [isAuth, setIsAuth] = useContext(AuthContext);
    const [account, setAccount] = useContext(AccountContext);
    const [isLoading, setIsLoading] = useState(true);
    const [favourites, setFavourites] = useContext(FavouritesContext);

    const getFavourites = useContext(GetFavouritesContext);

     let history = useHistory();

        if (!isAuth){
            history.replace('/login');
        }




    useEffect(() => {
        
          getFavourites(setIsLoading);
    },[])

    return (
        <div>
            {!isLoading && (
                <div>
                <h1> Favourites Section</h1>   
                <h2>{account.username}</h2>
                <FavouritesList
                    favourites={favourites}
                    setIsLoading={setIsLoading}
                    // getFavs = {getFavourites}
                />
            </div>
            )}

            {isLoading && (
                <h1>Loading...</h1>
            )}
            
        </div>
    );
};

export default FavouritesView;