import React, {useContext, useEffect} from 'react';

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

    const moreDetailsHandler = (site) => {
        setMoreDetails(true);
        setSelectedSite(site);
    }

    return (
        <div>
            {favourites.map(site => (
                <div className={classes.favListContainer}>

                    <div className={classes.pictureContainer}>
                    
                            <img src={'http://localhost:8080/' + site.images[0]}
                                 className={classes.sitePicture}
                                 alt="Image of divesite"/>
                    
            
                    </div>

                    <div className={classes.informationContainer}>

                        <div className={classes.topHalfContainer}>
                            <div className={classes.favouriteButtonContainer}>
                                <FavouriteButton site={site}/>
                            </div>
                            <div className={classes.siteNameContainer}>
                                <h1 className={classes.siteName}>{site.name}, {site.area}</h1>
                            </div>
                        </div>

                        <div className={classes.siteDescriptionContainer}>
                            <p className={classes.siteDescription}>Description: {site.description}</p>
                        </div>

                        <div className={classes.buttonsContainer}>
                            <div className={classes.moreDetailsButtonContainer}>
                                <Button onClick={() => moreDetailsHandler(site)}
                                        className={classes.moreDetailsButton}>
                                            More Details...
                                </Button>
                            </div>
                            <div className={classes.ellipsesButtonContainer}>
                                    <EllipsesButton/>
                            </div>
                        </div>

                    </div>

                </div>
            ))}

        </div>
    );
};

export default FavouritesList;