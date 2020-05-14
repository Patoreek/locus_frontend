import React from 'react';

import classes from './PhotoContainer.module.css';

const PhotoContainer = (props) => {
    return (
        <div className={classes.picturesContainer}>
            <h3>Photos</h3>
            {props.selectedSite.images.map(image => (
                <div className={classes.siteImages}>
                <img src = {'http://localhost:8080/' + image} className={classes.siteImage}/>
                </div>
            ))}
        </div>
    );
};

export default PhotoContainer;