import React, {useEffect, useContext} from 'react';

import { SiteContext } from '../../../context/DiveSiteContext';

import classes from './DetailsContainer.module.css';



const DetailsContainer = () => {

    const [selectedSite, setSelectedSite] = useContext(SiteContext);

    const goBackHandler = () => {

        // if (moreDetails) {
        //     setMoreDetails(false);
        // } else {
        //     console.log("Wont go here because component will no longer be visible");
        // }
        // if (props.moreDetails.pressed){
        //     props.setMoreDetails({
        //         pressed: false,
        //         siteId: ''
        //     })
        // } else {
        //     console.log('Wont be seen');
        // }
    }


    return (
        <div className={classes.detailsContainer}>
                    <button onClick={goBackHandler}>Back</button>

                    <div className={classes.nameContainer}>
                        <div className={classes.siteTypeContainer}>
                            <h3>Image</h3>
                            <p>Site Type: {selectedSite.siteType}</p>
                        </div>
                        <h2>{selectedSite.name}, {selectedSite.area}</h2>
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
                        <p>{selectedSite.description}</p>
                    </div>
    
                    <div className={classes.depthContainer}>
                        <h3>{selectedSite.depth}m</h3>
                    </div>
    
                    <div className={classes.visibilityContainer}>
                        <h3>{selectedSite.visibility}m</h3>
                    </div>
    
                    <div className={classes.weatherContainer}>
                        <h3>{selectedSite.weather}</h3>
                    </div>
    
                    <div className={classes.waterMapContainer}>
                        <h3>{selectedSite.underwaterMap}</h3>
                    </div>
                
                    <div className={classes.sightsContainer}>
                        <h3>{selectedSite.commonFeatures}</h3>
                    </div> 
    
    
                    <div className={classes.commentsContainer}>
                        <h3><a href="">comments</a></h3>
                    </div>
            </div>
    );
};

export default DetailsContainer;