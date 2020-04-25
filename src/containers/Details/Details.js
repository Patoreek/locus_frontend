import React from 'react';

import classes from './Details.module.css';


const Details = () => {
    return (
        <div className={classes.detailsContainer}>
            <div className={classes.nameContainer}>
            <div className={classes.siteTypeContainer}>
                <h3>Image</h3>
                <p>Site Type: Shore</p>
            </div>
            <h2>Site name, Site Area</h2>
            </div>
        <div className={classes.mediaContainer}>
            <div className={classes.picturesContainer}>
                <h3>Picture</h3>
            </div>
            <div className={classes.videosContainer}>
                <h3>Videos</h3>
            </div>
            <div className={classes.buttonMediaContainer}>
                <button>Pictures</button>
                <button>Videos</button>
            </div>
        </div>

        <div className={classes.reviewContainer}>
            <h3>review stars</h3>
        </div>

        <div className={classes.buttonsContainer}>
            <button>Favourite</button>
            <button>Report</button>
        </div>

        <div className={classes.descriptionContainer}>
            <h3>Description</h3>
        </div>
        <div className={classes.depthContainer}>
            <h3>Depth</h3>
        </div>
        <div className={classes.visibilityContainer}>
            <h3>Visibility</h3>
        </div>
        <div className={classes.weatherContainer}>
            <h3>Weather</h3>
        </div>
        <div className={classes.waterMapContainer}>
            <h3>Underwater Map?</h3>
        </div>
        
        <div className={classes.sightsContainer}>
            <h3>Common Sights e.g. Animals</h3>
        </div> 


        <div className={classes.commentsContainer}>
            <h3><a href="">comments</a></h3>
        </div>
        </div>
    );
};

export default Details;