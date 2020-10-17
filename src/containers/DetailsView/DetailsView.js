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

//TODO: V1.1 SVG Imports

import { ReactComponent as ShoreSVG } from '../../assets/icons/shore.svg';
import { ReactComponent as ReefSVG } from '../../assets/icons/reef.svg';
import { ReactComponent as DepthSVG } from '../../assets/icons/depth.svg';
import { ReactComponent as XpSVG } from '../../assets/icons/experience.svg';
import { ReactComponent as TemperatureSVG } from '../../assets/icons/temperature.svg';
import { ReactComponent as VisibilitySVG } from '../../assets/icons/visibility.svg';



import classes from './DetailsView.module.scss';

const Details = (props) => {
    const siteId = props.match.params.id;
    console.log(siteId);
    
    const [selectedSite, setSelectedSite] = useContext(SiteContext);
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
            setSelectedSite(site);

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
    console.log(siteImages);

    return (
      <div>
          {!isLoading && (
            <div className={classes.divesite}>
                {/* <h3> isLoading is now turned OFF! Should be working...</h3> */}

                <div className={classes.divesite__locationTop}>
                  <a target="_blank" href="http://www.google.com/search?q=Shellharbour%2C+New+South+Wales%2C+Australia">Shellharbour, New South Wales, Australia</a> {/* Should be a link to the map / google maps of the area?? */}
                </div>
                
                <div className={classes.divesite__imageGridContainer}>
                  <div className={`${classes.image} ${classes.image__1}`}>
                    <img className={classes.image} src={'http://localhost:8080/' + siteImages[0]}/>
                  </div>
                  <div className={`${classes.image} ${classes.image__2}`}>
                    <img className={classes.image} src={'http://localhost:8080/' + siteImages[1]}/>
                  </div>
                  <div className={`${classes.image} ${classes.image__3}`}>
                    <img className={classes.image} src={'http://localhost:8080/' + siteImages[2]}/>
                  </div>
                  <div className={`${classes.image} ${classes.image__4}`}>
                    <img className={classes.image} src={'http://localhost:8080/' + siteImages[0]}/>
                  </div>
                  <div className={`${classes.image} ${classes.image__5}`}>
                    <img className={classes.image} src={'http://localhost:8080/' + siteImages[1]}/>
                  </div>
                </div>

                {/* USE FLEXBOX COLUMN */}
                <div className={classes.divesite__nameContainer}>
                    <h3 className={classes.name}>{siteName}, {siteArea}</h3>
                    <a target="_blank" href="http://www.google.com/search?q=Shellharbour%2C+New+South+Wales%2C+Australia"> Shellharbour, New South Wales, Australia</a> {/* Should be a link to the map / google maps of the area?? */}
                    <div className={classes.ratingsContainer}>
                      <div className={classes.ratingsContainer__rating}>
                      <StarRating site={selectedSite}/>
                      </div>
                      <div className={classes.ratingsContainer__favBtn}>
                        <FavouriteButton site={selectedSite}/>
                      </div>
                    </div>
                </div>


                <div className={classes.divesite__points}>
                    <div className={classes.point}> 
                      <ShoreSVG className={classes.point__icon}/> 
                      <div className={classes.point__text}>                         
                        <span>{siteType == 1 ? "Shore Dive" : "Boat Dive"}</span>
                      </div>
                    </div>
                    <div className={classes.point}>
                      <ReefSVG className={classes.point__icon}/>
                      <div className={classes.point__text}>            
                        <span>Reef Dive</span>
                      </div>
                    </div>
                    <div className={classes.point}>
                      <DepthSVG className={classes.point__icon}/>   
                      <div className={classes.point__text}>         
                        <span>Max Depth: {siteDepth}m</span>
                        <span>Average Depth: {siteDepth}m</span>
                      </div>
                    </div>
                    <div className={classes.point}>
                      <XpSVG className={classes.point__icon}/>  
                      <div className={classes.point__text}>          
                        <span>Open Water Scuba Diver</span>
                        <span>Great for Snorkelling</span>
                      </div>
                    </div>
                    <div className={classes.point}>
                      <TemperatureSVG className={classes.point__icon}/>  
                      <div className={classes.point__text}>
                        <span>18°C - 24°C</span>   
                      </div>       
                    </div>
                    <div className={classes.point}>
                      <VisibilitySVG className={classes.point__icon}/> 
                      <div className={classes.point__text}>           
                        <span>7 - {siteVisibility}m</span>
                      </div>
                    </div>
                  
                </div>

                <div className={classes.divesite__descriptionContainer}>
                  <p>{siteDescription}</p>
                </div>

                <div className={classes.divesite__rightContainer}>
                  <a href="#" className={classes.photoLink}>See all community photos</a>
                  <div className={classes.weatherContainer}>
                    Weather Container (PLACE THIS AND IMPLEMENT LATER)
                  </div>
                </div>

          
                {/* //! DIVE REPORTS SECTION WILL GO HERE  */}
                <div className={classes.divesite__reportsContainer}>
                  <h4>Dive Reports (999+)</h4>
                  <div className={classes.underConstruction}>
                    <span> (UNDER CONSTRUCTION) </span> 
                  </div>
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