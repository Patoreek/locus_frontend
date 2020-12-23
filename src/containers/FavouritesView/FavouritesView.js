import React, {useEffect, useContext, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext,  
         FavouritesContext,
         GetFavouritesContext } from '../../context/AuthContext';

import FavouritesList from './FavouritesList/FavouritesList';

import Spinner from '../../components/Spinner/Spinner';

import classes from './FavouritesView.module.scss';



const FavouritesView = () => {

    const [isAuth, setIsAuth] = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [favourites, setFavourites] = useContext(FavouritesContext);

    const getFavourites = useContext(GetFavouritesContext);

     let history = useHistory();

        if (!isAuth){
            history.replace('/login');
        }




    useEffect(() => {
            document.title = "Locus - Favourites";
          getFavourites(setIsLoading);
    },[]);


    return (
        <div className={classes.favouritesPage}>

            {!isLoading && (
                <div className={classes.favouritesContainer}>  
        
                    <FavouritesList
                    favourites={favourites}
                    setIsLoading={setIsLoading}
                    // getFavs = {getFavourites}
                    />
                
              
                
            </div>
            )}

            {isLoading && (
                <div className={classes.spinnerContainer}>
                    <Spinner />
                </div>
            )}
            
        </div>
    );
};

export default FavouritesView;