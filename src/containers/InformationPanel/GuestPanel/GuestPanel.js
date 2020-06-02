import React, { useEffect, useContext} from 'react';

import { Button } from 'react-bootstrap';

import { DiveSitesContext,
         DetailsContext,
         SiteContext } from '../../../context/DiveSiteContext';

import {AuthContext} from '../../../context/AuthContext';

import StarRating from '../../../components/StarRating/StarRating';
import FavouriteButton from '../../../components/Buttons/FavouriteButton/FavouriteButton';
import EllipsesButton from '../../../components/Buttons/EllipsesButton/EllipsesButton';
import ToggleButtons from '../ToggleButtons/ToggleButtons';

import classes from './GuestPanel.module.css';

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

    const style = {
        backgroundColor: "rgba(255, 255, 255, 0.75)",
        padding: "0.5vw 1vw 0vw 1vw",
        borderRight: "1px solid slateblue",
        borderBottom: "1px solid slateblue",
        overflow: "hidden",
        borderRadius: "0.5vw 0vw 0.5vw 0vw",
    }

    const totalRatingStyle = {
        display:"none"
    }

    /* const ellipsesButtonStyle = {
        width: "30px",
        height: "30px",
        marginBottom: "10px"
    } */

    return (
        <div>
            {/* <ToggleButtons/> */}
            <h1 className={classes.panelHeader}>Divesites</h1>
        {diveSites.map(site => (
            <div className={classes.siteContainer}>
                <div className={classes.siteImageContainer} 
                     onClick={() => moreDetailsHandler(site)}>

                    <img src={'http://localhost:8080/' + site.images[0]}
                        className={classes.siteImage}
                    />
                </div>

                <div className={classes.favButtonContainer}>
                    {isAuth ? <FavouriteButton site={site}/> : null}
                </div>

                <div className={classes.siteRatingsContainer}>
                    <StarRating siteRatings = {site.ratings}
                                guestMapStyle={style}
                                totalRatingStyle={totalRatingStyle}/>
                </div>


                <div className={classes.siteNameContainer}>
                    <h5  className={classes.siteName}
                         onClick={() => moreDetailsHandler(site)}>
                             {site.name}, {site.area}
                    </h5>
                    <div className={classes.ellipsesButtonContainer}>
                        <EllipsesButton/>
                    </div>
                    
                </div>

                <div className={classes.siteDescriptionContainer}>
                    <p className={classes.siteDescription}> {site.description} </p>
                    <div className={classes.moreDetailsButtonContainer}>
                    <Button onClick={() => moreDetailsHandler(site)}
                            className={classes.moreDetailsButton}
                            >More Details...</Button>
                    </div>
                </div>
            
            </div>
        ))}

        </div>
    );
};

export default GuestPanel;