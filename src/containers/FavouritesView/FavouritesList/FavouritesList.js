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



const FavouritesList = (props) => {

    //const getFavourites = props.getFavs();


    const [ selectedSite, setSelectedSite ] = useContext(SiteContext);

    const [ favourites, setFavourites ] = useContext(FavouritesContext);

    const [account, setAccount] = useContext(AccountContext);

    const getFavourites = useContext(GetFavouritesContext);

    const removeFromFavourite = useContext(RemoveFavContext);


    
    return (
        <div className={classes.favouritesList}>
            <h1 className={classes.favouritesList__header}>{account.username}'s Favourites ({favourites.length})</h1> 
            <div className={classes.favourites}>
                            {favourites.map(favourite => (
                                <div className={classes.favouriteContainer}>

                                    <div className={classes.favouriteContainer__imageContainer}>

                                        <img src={'http://localhost:8080/' + favourite.images[0]} 
                                        className={classes.image}
                                        />
                                    </div>
                                    <div className={classes.favouriteContainer__pointContainer}>
                                        <span className={classes.point}>Shore Dive · Great for Scuba</span>
                                    </div>
                                    <div className={classes.favouriteContainer__nameContainer}>
                                        <span className={classes.name}>{favourite.name}, {favourite.area}</span>
                                    </div>
                                    
                                    <div className={classes.favouriteContainer__descriptionContainer}>
                                        <span className={classes.description}>{favourite.description}...Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                                    </div>
                                    <div className={classes.favouriteContainer__ratingContainer}>
                                        <div className={classes.rating}>
                                             <StarRating site={favourite}/>
                                            
                                        </div>
                                    </div>
                                    <div className={classes.favouriteContainer__moreContainer}>
                                        <a href="#" className={classes.more}>More...</a>
                                    </div>
                                </div>
                            ))}
            </div>
        </div>
    );
};

export default FavouritesList;