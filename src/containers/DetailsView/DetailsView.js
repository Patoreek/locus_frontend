import React, { useState, useContext, useEffect } from 'react';

import { SiteContext,
         DetailsContext } from '../../context/DiveSiteContext';

import { AuthContext } from '../../context/AuthContext';


import Spinner from 'react-bootstrap/Spinner';



import StarRating from '../../components/StarRating/StarRating';
import Comments from '../../components/Comments/Comments';
import FavouriteButton from '../../components/Buttons/FavouriteButton/FavouriteButton';

import shoreIcon from '../../images/locationIcons/ShoreIcon.svg';
import boatIcon from '../../images/locationIcons/BoatIcon.svg';



import classes from './DetailsView.module.scss';

const Details = (props) => {
    const siteId = props.match.params.id;
    console.log(siteId);
    
    //const [selectedSite, setSelectedSite] = useContext(SiteContext);
    const [moreDetails, setMoreDetails] = useContext(DetailsContext);
    const [isAuth, setIsAuth] = useContext(AuthContext);



    const [siteName, setSiteName] = useState();
    const [siteArea, setSiteArea] = useState();
    const [siteImages, setSiteImages] = useState();
    const [siteVideos, setSiteVideos] = useState();
    const [siteType, setSiteType] = useState()
    const [siteDescription, setSiteDescription] = useState();
    const [siteDepth, setSiteDepth] = useState();
    const [siteVisibility, setSiteVisibility] = useState();
    const [siteUnderwaterMap, setSiteUnderwaterMap] = useState();
    const [siteFeatures, setSiteFeatures] = useState();

    const [siteComments, setSiteComments] = useState("");
    const [siteReview, setSiteReview] = useState("");

    const [currentWeather, setCurrentWeather] = useState(null);
    const [dailyWeather, setDailyWeather] = useState(null);
    const [siteWeather, setSiteWeather] = useState();
    const [iconUrl, setIconUrl] = useState("");


    const [weatherContent, setWeatherContent] = useState();


    const [isLoading, setIsLoading] = useState(true);

    const [key, setKey] = useState('features');


    const weekday = new Array(7);
        weekday[0] = "Sun";
        weekday[1] = "Mon";
        weekday[2] = "Tues";
        weekday[3] = "Wed";
        weekday[4] = "Thur";
        weekday[5] = "Fri";
        weekday[6] = "Sat";


    // const isMobile = useMediaQuery('(max-width: 800px)');

    const goBackHandler = () => {

        setMoreDetails(false);
    }

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };


    
    console.log('SITE ID -->' + siteId);
    

    useEffect(() => {
        //const siteLat = selectedSite.latitude;
        //const siteLng = selectedSite.longitude
        //console.log(siteLat);
        //console.log(siteLng);

        async function getSite() {

          try {
            const response = await fetch('http://localhost:8080/diveSites/findSite/' + siteId,{
              method: 'GET',
              credentials: 'include',
            });
            const results = await response.json();
            console.log(results);
            const site = results.site;

            setSiteName(site.name);
            setSiteArea(site.area);
            setSiteImages(site.images);
            setSiteVideos(site.videos);
            setSiteType(site.siteType);
            setSiteDescription(site.description);
            setSiteDepth(site.depth);
            setSiteVisibility(site.visibility);
            setSiteUnderwaterMap(site.underwaterMap);
            setSiteFeatures(site.commonFeatures);

            setIsLoading(false);
    
          } catch (error) {
           console.log(error);
           //setIsLoading(true);
          }
        }

        getSite();
  
    },[]);

    // // console.log('WEATHERCONTENT');
    // // console.log(weatherContent);
    // //console.log(weatherContent);

    return (
      <div className={classes.diveSite}>
         <h3> Testing Header Tag</h3>
          {!isLoading && (
            <div>
                <h3> isLoading is now turned OFF! Should be working...</h3>


                <h3>Shellharbour, New South Wales, Australia</h3> {/* Should be a link to the map / google maps of the area?? */}
                <h3>{siteName}, {siteArea}</h3>
                <h3>Shellharbour, New South Wales, Australia</h3> {/* Should be a link to the map / google maps of the area?? */}
                <h3>See all community photos</h3>
                <h3> List of info with icons</h3>
                <h3>Access: {siteType}</h3>
                <h3>Depth: {siteDepth}m</h3>
                <h3>Visibility: {siteVisibility}m</h3>
                <h3>Experience Level: Open Water ...</h3>
                <h3>Average Temperature: 18deg </h3>
                <h3>Dive Environment: Reef Dive / Wreck Dive </h3>

                <h3>{siteDescription}</h3>
                <div>
                  Weather Container (PLACE THIS AND IMPLEMENT LATER)
                </div>

                <div>
                  <h3>DIVE REPORTS (UNDER CONSTRUCTION)</h3>
                </div>
             


          </div>
          )}
          {isLoading && (
            <h3> isLoading is still TRUE...</h3>
          )}

      </div>
    );
};

export default Details;