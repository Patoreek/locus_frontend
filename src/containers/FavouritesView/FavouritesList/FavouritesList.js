import React, {useContext, useEffect} from 'react';

import classes from './FavouritesList.module.css';

import { useMediaQuery } from '../../../CustomHooks/useMediaQuery';

import { Button } from 'react-bootstrap';

import { RemoveFavContext,
         FavouritesContext,
         AccountContext,
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

    const [account, setAccount] = useContext(AccountContext);

    const getFavourites = useContext(GetFavouritesContext);

    const removeFromFavourite = useContext(RemoveFavContext);

    const moreDetailsHandler = (site) => {
        setMoreDetails(true);
        setSelectedSite(site);
    }

    const isMobileBased = useMediaQuery('(max-width: 760px)');

    let ellipsesStyle;

    let favButtonStyle;

    if (isMobileBased) {
        ellipsesStyle = {
            width: "auto",
            height: "25px",
            fontSize: "12px"
        }

        favButtonStyle = {
            width: "auto",
            height: "20px",
            fontSize: "12px"
        }


    } else {
        ellipsesStyle = {
            width: "50px",
            height: "40px",
            fontSize: "25px",
            padding: "0"
        }

        favButtonStyle = {
            width: "auto",
            height: "40px",
            margin: "5px 5px"
        }

    }
    return (
        <div>
            <h1 className={classes.favouritesHeader}>{account.username}'s Favourites</h1> 
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
                                <FavouriteButton site={site} style={favButtonStyle}/>
                            </div>
                            <div className={classes.siteNameContainer}>
                                <h1 className={classes.siteName}>{site.name}, {site.area}</h1>
                            </div>
                        </div>

                        <div className={classes.siteDescriptionContainer}>
                            <p className={classes.siteDescription}>{site.description}</p>
                        </div>

                        <div className={classes.buttonsContainer}>
                            <div className={classes.moreDetailsButtonContainer}>
                                <Button onClick={() => moreDetailsHandler(site)}
                                        className={classes.moreDetailsButton}>
                                            More Details...
                                </Button>
                            </div>
                            <div className={classes.ellipsesButtonContainer}>
                                    <EllipsesButton style={ellipsesStyle}/>
                            </div>
                        </div>

                    </div>

                </div>
            ))}

        </div>
    );
};

export default FavouritesList;