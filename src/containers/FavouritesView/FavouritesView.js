import React, {useEffect, useContext, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext,  
         FavouritesContext,
         GetFavouritesContext } from '../../context/AuthContext';

import FavouritesList from './FavouritesList/FavouritesList';

import { DetailsContext } from '../../context/DiveSiteContext';

import DetailsView from '../DetailsView/DetailsView';

import classes from './FavouritesView.module.css';



const FavouritesView = () => {

    const [isAuth, setIsAuth] = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [favourites, setFavourites] = useContext(FavouritesContext);

    const [moreDetails, setMoreDetails] = useContext(DetailsContext);


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
                <div className={classes.favouritesContainer}>  
                
                {!moreDetails && (
                    <FavouritesList
                    favourites={favourites}
                    setIsLoading={setIsLoading}
                    // getFavs = {getFavourites}
                    />
                )}
                {moreDetails && (
                    <DetailsView/>
                )}
                
            </div>
            )}

            {isLoading && (
                <h1>Loading...</h1>
            )}
            
        </div>
    );
};

export default FavouritesView;