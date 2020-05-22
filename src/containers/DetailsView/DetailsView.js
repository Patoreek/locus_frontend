import React, { useState, useContext, useEffect } from 'react';

import { SiteContext,
         DetailsContext } from '../../context/DiveSiteContext';

import { AuthContext } from '../../context/AuthContext';


import StarRating from '../../components/StarRating/StarRating';
import Comments from '../../components/Comments/Comments';
import FavouriteButton from '../../components/Buttons/FavouriteButton/FavouriteButton';
import EllipsesButton from '../../components/Buttons/EllipsesButton/EllipsesButton'; 

import classes from './DetailsView.module.css';

const Details = (props) => {
    
    const [selectedSite, setSelectedSite] = useContext(SiteContext);
    const [moreDetails, setMoreDetails] = useContext(DetailsContext);
    const [isAuth, setIsAuth] = useContext(AuthContext);



    const [siteName, setSiteName] = useState(selectedSite.name);
    const [siteArea, setSiteArea] = useState(selectedSite.area);
    const [siteImages, setSiteImages] = useState(selectedSite.images);
    const [siteVideos, setSiteVideos] = useState(selectedSite.videos);
    const [siteType, setSiteType] = useState(selectedSite.siteType)
    const [siteDescription, setSiteDescription] = useState(selectedSite.description);
    const [siteDepth, setSiteDepth] = useState(selectedSite.depth);
    const [siteVisibility, setSiteVisibility] = useState(selectedSite.visibility);
    const [siteUnderwaterMap, setSiteUnderwaterMap] = useState(selectedSite.underwaterMap);
    const [siteFeatures, setSiteFeatures] = useState(selectedSite.commonFeatures);

    const [siteComments, setSiteComments] = useState("");
    const [siteReview, setSiteReview] = useState("");

    const [currentWeather, setCurrentWeather] = useState(null);
    const [dailyWeather, setDailyWeather] = useState(null);
    const [siteWeather, setSiteWeather] = useState();

    const goBackHandler = () => {

        setMoreDetails(false);
    }

    useEffect(() => {
        const siteLat = selectedSite.latitude;
        const siteLng = selectedSite.longitude
        console.log(siteLat);
        console.log(siteLng);

        async function getWeather() {
            const response = await fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + siteLat + '&lon=' + siteLng + '&appid=bb55558b494d860741d920a7d21bda6b',{
                method: 'GET'
            });
            const data = await response.json();
            setCurrentWeather(data.current);
            setDailyWeather(data.daily);
            setSiteWeather((data.current.temp - 273.15).toFixed(1));
            console.log(data);

            //const sites = data.site;
        }
        getWeather();
    },[]);

    return (
        <div className={classes.detailsContainer}>
        <button onClick={goBackHandler}>Back</button>

        <div className={classes.nameContainer}>
            <div className={classes.siteTypeContainer}>
                <h3>Image</h3>
                <p>Site Type</p>
            </div>
            <h2>Name:{siteName} || Area: {siteArea}</h2>
        </div>

        <div className={classes.mediaContainer}>
            <div className={classes.picturesContainer}>
                <h3>Picture</h3>
                {siteImages.map(image => (
                    <div className={classes.images}>
                    <img src = {'http://localhost:8080/' + image} width="400px" height="200px"/>
                    </div>
                ))}
            </div>
            <div className={classes.videosContainer}>
                <h3>Videos</h3>
                <p>{siteVideos}</p>
            </div>
            {/* <div className={classes.buttonMediaContainer}>
                <button>Pictures</button>
                <button>Videos</button>
            </div> */}
        </div>

        <div className={classes.reviewContainer}>
            <StarRating/>
        </div>

        <div className={classes.buttonsContainer}>
            {isAuth ? <FavouriteButton site={selectedSite}/>: null}
            <EllipsesButton/>
        </div>

        <div className={classes.descriptionContainer}>
            <h3>Description</h3>
            <p>{siteDescription}</p>
        </div>

        <div className={classes.depthContainer}>
            <h3>Max Depth: {siteDepth}m</h3>
        </div>

        {/* <div className={classes.visibilityContainer}>
            <h3>{siteVisibility}m * REMOVE THIS</h3>
        </div> */}

        <div className={classes.weatherContainer}>
            <h3>Current Weather</h3>
            <p>{siteWeather} Celsius</p>
            <p>Check Forecast for this week</p>
        </div>

        <div className={classes.waterMapContainer}>
            <h3>Underwater Map</h3>
            <p>{siteUnderwaterMap}</p>
        </div>
    
        <div className={classes.sightsContainer}>
            <h6>Common sights / features </h6>
            {siteFeatures.map(feature => (
                <div>
                    <h3>{feature.featureType}: {feature.name}</h3>
                </div>
            ))}
        </div> 


        <div className={classes.commentsContainer}>
            <h3><b>Comments</b></h3>
            <Comments/>
        </div>
</div>
            
        
    );
};

export default Details;