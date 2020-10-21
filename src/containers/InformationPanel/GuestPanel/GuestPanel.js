import React, { useEffect, useContext} from 'react';

import { useHistory } from "react-router-dom";


import { DiveSitesContext,
         DetailsContext,
         SiteContext,
         LocationNameContext } from '../../../context/DiveSiteContext';

import {AuthContext} from '../../../context/AuthContext';

import StarRating from '../../../components/StarRating/StarRating';
import FavouriteButton from '../../../components/Buttons/FavouriteButton/FavouriteButton';
import EllipsesButton from '../../../components/Buttons/EllipsesButton/EllipsesButton';
import ToggleButtons from '../ToggleButtons/ToggleButtons';



import classes from './GuestPanel.module.scss';

const GuestPanel = () => {

    let history = useHistory();

    const [diveSites, setDiveSites] = useContext(DiveSitesContext);

    const [moreDetails, setMoreDetails] = useContext(DetailsContext);

    const [selectedSite, setSelectedSite] = useContext(SiteContext);

    const [locationName, setLocationName] = useContext(LocationNameContext);

    const [isAuth, setIsAuth] = useContext(AuthContext);



    return (
        <div className={classes.guestPanel}>
            <div className={classes.topSection}>
                <p>24 sites  · Location {locationName} </p>
                <h3>Dive sites in selected map area</h3> 
            </div>

            {/* <ToggleButtons/> */}
        {diveSites.map(site => (
            <div className={classes.site}>
                <div className={classes.site__imageContainer}>
                    <a href={"/divesite/" + site._id}>
                        <img src={'http://localhost:8080/' + site.images[0]}
                            className={classes.image}
                        />
                    </a>
                </div>

                <div className={classes.site__diveTypeContainer}>
                       <span> Shore Dive · Great for Scuba </span> 
                </div>


                <div className={classes.site__nameContainer}>
                    <h5  className={classes.siteName}>
                        <a href={"/divesite/" + site._id}>
                             {site.name}, {site.area}
                        </a>
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
                    <StarRating site={site}/>
                </div>

                <div className={classes.site__moreDetailsContainer}>
                             <a href={"/divesite/" + site._id} className={classes.moreDetailsButton}>
                                    More Details...
                                </a>
                </div>
            
            </div>
        ))}

        </div>
    );
};

export default GuestPanel;