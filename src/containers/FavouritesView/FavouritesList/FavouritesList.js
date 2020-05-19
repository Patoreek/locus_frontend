import React, {useContext} from 'react';

import classes from './FavouritesList.module.css';

import { Button } from 'react-bootstrap';

import { RemoveFavContext,
         FavouritesContext,
         GetFavouritesContext } from '../../../context/AuthContext';

import { SiteContext } from '../../../context/DiveSiteContext';

import { DetailsContext } from '../../../context/DiveSiteContext';

import FavouriteButton from '../../../components/Buttons/FavouriteButton/FavouriteButton';

import EllipsesButton from '../../../components/Buttons/EllipsesButton/EllipsesButton';



const FavouritesList = (props) => {

    //const getFavourites = props.getFavs();

    const [moreDetails, setMoreDetails] = useContext(DetailsContext);

    const [ selectedSite, setSelectedSite ] = useContext(SiteContext);

    const [ favourites, setFavourites ] = useContext(FavouritesContext);

    const getFavourites = useContext(GetFavouritesContext);

    const removeFromFavourite = useContext(RemoveFavContext);

    const commentHandler = () => {

    }

    const moreDetailsHandler = (site) => {
        setMoreDetails(true);
        setSelectedSite(site);
    }

    return (
        <div>
            {favourites.map(site => (
                <div className={classes.favListContainer}>
                    <h1>Site Name: {site.name}</h1>
                    <h3>Site Area: {site.area}</h3>
                    <p>Description: {site.description}</p>
                    <div className={classes.buttonsContainer}>
                    <Button onClick={() => moreDetailsHandler(site)}>More Details...</Button>
                    
                                <FavouriteButton site={site}/>
                               
                                <Button onClick={commentHandler}>Comment</Button>
                                <EllipsesButton/>
                            </div>
                </div>
            ))}

        </div>
    );
};

export default FavouritesList;