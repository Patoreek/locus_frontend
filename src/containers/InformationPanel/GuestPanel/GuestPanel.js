import React, { useEffect, useContext} from 'react';

import { DiveSitesContext,
         DetailsContext,
         SiteContext } from '../../../context/DiveSiteContext';

import {AuthContext} from '../../../context/AuthContext';

import StarRating from '../../../components/StarRating/StarRating';
import FavouriteButton from '../../../components/Buttons/FavouriteButton/FavouriteButton';
import EllipsesButton from '../../../components/Buttons/EllipsesButton/EllipsesButton';
import ToggleButtons from '../ToggleButtons/ToggleButtons';



import classes from './GuestPanel.module.scss';

const GuestPanel = () => {

    const [diveSites, setDiveSites] = useContext(DiveSitesContext);

    const [moreDetails, setMoreDetails] = useContext(DetailsContext);

    const [selectedSite, setSelectedSite] = useContext(SiteContext);

    const [isAuth, setIsAuth] = useContext(AuthContext);

    const moreDetailsHandler = (site) => {
        console.log('In more details');
        if (!moreDetails){
            setSelectedSite(site);
            setMoreDetails(true);
        }
        if (moreDetails){
            setMoreDetails(false);
            // THEN OPEN NEW SITE THAT WAS SELECTED
        }
    }



    return (
        <div className={classes.guestPanel}>
            <div className={classes.topSection}>
                <p>24 sites  · Location </p>
                <h3>Dive sites in selected map area</h3> 
            </div>

            {/* <ToggleButtons/> */}
        {diveSites.map(site => (
            <div className={classes.site}>
                <div className={classes.site__imageContainer} 
                     onClick={() => moreDetailsHandler(site)}>

                    <img src={'http://localhost:8080/' + site.images[0]}
                        className={classes.image}
                    />
                </div>

                <div className={classes.site__diveTypeContainer}>
                       <span> Shore Dive · Great for Scuba </span> 
                </div>


                <div className={classes.site__nameContainer}>
                    <h5  className={classes.siteName}
                         onClick={() => moreDetailsHandler(site)}>
                             {site.name}, {site.area}
                    </h5>
                </div>

                {isAuth && (
                    <div className={classes.site__favButtonContainer}>
                        <FavouriteButton site={site}/> 
                    </div>
                )}

            

                <div className={classes.site__descriptionContainer}>
                    <p className={classes.siteDescription}> {site.description} </p>
                </div>

                <div className={classes.site__ratingsContainer}>
                    <StarRating siteRatings = {site.ratings}/>
                </div>

                <div className={classes.site__moreDetailsContainer}>
                    <span onClick={() => moreDetailsHandler(site)}
                            className={classes.moreDetailsButton}
                            >More Details...</span>
                </div>
            
            </div>
        ))}

        </div>
    );
};

export default GuestPanel;