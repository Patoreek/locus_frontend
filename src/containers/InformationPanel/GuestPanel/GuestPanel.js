import React, { useEffect, useContext} from 'react';

import { Button } from 'react-bootstrap';

import { DiveSitesContext,
         DetailsContext,
         SiteContext } from '../../../context/DiveSiteContext';

import StarRating from '../../../components/StarRating/StarRating';
import FavouriteButton from '../../../components/Buttons/FavouriteButton/FavouriteButton';
import EllipsesButton from '../../../components/Buttons/EllipsesButton/EllipsesButton';

import classes from './GuestPanel.module.css';

const GuestPanel = () => {

    const [diveSites, setDiveSites] = useContext(DiveSitesContext);

    const [moreDetails, setMoreDetails] = useContext(DetailsContext);

    const [selectedSite, setSelectedSite] = useContext(SiteContext);

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
        <div>
            <h1>GUEST PANEL</h1>
        {diveSites === [] && (
            <div>
            <p> Users that dont have an account but want to search sites view</p>
            <p> What the user will see </p>
            </div>
        )}
        {diveSites.map(site => (
            <div className={classes.siteContainer}>
            <b>{site.name}, {site.area}</b>
            <p> {site.description} </p>
            <img src={'http://localhost:8080/' + site.images[0]}
                 className={classes.siteImage}
            />
            <StarRating siteRatings = {site.ratings}/>
            <FavouriteButton site={site}/>
            <Button onClick={() => moreDetailsHandler(site)}>More Details</Button>
            <EllipsesButton/>
            </div>
        ))}

        </div>
    );
};

export default GuestPanel;