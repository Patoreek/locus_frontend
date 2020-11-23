import React from 'react';
import classes from './DiveshopListing.module.scss';

const DivesiteListing = (props) => {

    const site = props.site;
    return (
        <div className={classes.divesiteListing}>

                        <div className={classes.divesiteListing__imageContainer}>
                            <a href={"/divesite/" + site._id}>
                                <img src={'http://localhost:8080/' + site.images[0]} 
                                className={classes.image}
                                />
                            </a>
                        </div>
                        <div className={classes.divesiteListing__pointContainer}>
                            <span className={classes.point}>Shore Dive · Great for Scuba</span>
                        </div>
                        <div className={classes.divesiteListing__nameContainer}>
                            <a href={"/divesite/" + site._id}>
                                <span className={classes.name}>{site.name}, {site.area}</span>
                            </a>
                        </div>
                        
                        <div className={classes.divesiteListing__descriptionContainer}>
                            <span className={classes.description}>{site.description}...Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                        </div>
                        <div className={classes.divesiteListing__ratingContainer}>
                            <div className={classes.rating}>
                                {/* <StarRating siteRatings = {site.ratings}/> */}
                            </div>
                        </div>
                        <div className={classes.divesiteListing__moreContainer}>
                            <a href={"/divesite/" + site._id} className={classes.more}>More...</a>
                        </div>
        </div>
    );
};

export default DivesiteListing;