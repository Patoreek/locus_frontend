import React, {useContext} from 'react';

import classes from './FavouritesList.module.css';

import { RemoveFavContext,
         FavouritesContext,
         GetFavouritesContext } from '../../../context/AuthContext';

import { SiteContext } from '../../../context/DiveSiteContext';


const FavouritesList = (props) => {

    //const getFavourites = props.getFavs();

    const [ selectedSite, setSelectedSite ] = useContext(SiteContext);

    const [ favourites, setFavourites ] = useContext(FavouritesContext);

    const getFavourites = useContext(GetFavouritesContext);

    const removeFromFavourite = useContext(RemoveFavContext);

    const commentHandler = () => {

    }

    return (
        <div>
            {favourites.map(site => (
                <div className={classes.favListContainer}>
                    <h1>Site Name: {site.name}</h1>
                    <h3>Site Area: {site.area}</h3>
                    <p>Description: {site.description}</p>
                    <div className={classes.buttonsContainer}>
                                <button onClick={() => {
                                    console.log('SITE');
                                    console.log(site);
                                    removeFromFavourite(site, props.setIsLoading);
                                    //getFavourites();
                                }
                                }>Unfavourite</button>
                                <button onClick={commentHandler}>Comment</button>
                                <button>...</button> {/* Share and report buttons*/}
                            </div>
                </div>
            ))}

        </div>
    );
};

export default FavouritesList;