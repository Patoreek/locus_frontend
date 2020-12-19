import React, {useContext, useEffect} from 'react';

import classes from './FavouritesList.module.scss';

import { useMediaQuery } from '../../../CustomHooks/useMediaQuery';

import { Button } from 'react-bootstrap';

import { RemoveFavContext,
         FavouritesContext,
         AccountContext,
         GetFavouritesContext } from '../../../context/AuthContext';

import { SiteContext } from '../../../context/DiveSiteContext';

import StarRating from '../../../components/StarRating/StarRating';
import FavouriteButton from '../../../components/Buttons/FavouriteButton/FavouriteButton';

import EllipsesButton from '../../../components/Buttons/EllipsesButton/EllipsesButton';

import DivesiteListingPanel from '../../../components/Divesite/DivesiteListingPanel/DivesiteListingPanel';


const FavouritesList = (props) => {

    //const getFavourites = props.getFavs();


    const [ selectedSite, setSelectedSite ] = useContext(SiteContext);

    const [ favourites, setFavourites ] = useContext(FavouritesContext);

    const [account, setAccount] = useContext(AccountContext);

    const getFavourites = useContext(GetFavouritesContext);

    const removeFromFavourite = useContext(RemoveFavContext);


    
    return (
        <div className={classes.favouritesList}>
            <h1 className={classes.favouritesList__header}>Favourites · {favourites.length} Dive sites</h1> {/* {account.username}'s  */}
            <div className={classes.favourites}>
                            {favourites.map(favourite => (
                                <DivesiteListingPanel site={favourite}/>
                            ))}
            </div>
        </div>
    );
};

export default FavouritesList;