import React, { useEffect, useContext} from 'react';

import { DiveSitesContext } from '../../../context/DiveSiteContext';

import StarRating from '../../../components/StarRating/StarRating';
import FavouriteButton from '../../../components/Buttons/FavouriteButton/FavouriteButton';

import classes from './GuestPanel.module.css';

const GuestPanel = () => {

    const [diveSites, setDiveSites] = useContext(DiveSitesContext);

    //console.log(diveSites);


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
            {/* {isAuth && (
                <div className={classes.buttonsContainer}>
                    {favouriteButton}
                    <Button onClick={commentHandler}>Comment</Button>
                    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                        <Button variant="info">...</Button>
                    </OverlayTrigger>
                </div>
             )}  */}
            </div>
        ))}

        </div>
    );
};

export default GuestPanel;