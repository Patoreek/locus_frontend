import React, { useState, useContext, useEffect } from 'react';

import { SiteContext,
         DetailsContext } from '../../context/DiveSiteContext';

import { AuthContext, AuthDrawerContext} from '../../context/AuthContext';


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
import { ReactComponent as GoogleMapSVG } from '../../assets/icons/google-map-icon.svg';




import classes from './DetailsView.module.scss';

const Details = (props) => {
    const siteId = props.match.params.id;
    console.log(siteId);
    
    const [selectedSite, setSelectedSite] = useContext(SiteContext);
    const [moreDetails, setMoreDetails] = useContext(DetailsContext);
    const [isAuth, setIsAuth] = useContext(AuthContext);
    const [authDrawer, setAuthDrawer] = useContext(AuthDrawerContext);




    const [siteName, setSiteName] = useState();
    const [siteArea, setSiteArea] = useState();
    const [siteCountry, setSiteCountry] = useState();
    const [siteImages, setSiteImages] = useState([]);
    const [siteType, setSiteType] = useState();
    const [siteAccess, setSiteAccess] = useState();
    const [siteDescription, setSiteDescription] = useState();
    const [siteAvgDepth, setSiteAvgDepth] = useState();
    const [siteMaxDepth, setSiteMaxDepth] = useState();
    const [siteMinTemp, setSiteMinTemp] = useState();
    const [siteMaxTemp, setSiteMaxTemp] = useState();
    const [siteMinVis, setSiteMinVis] = useState();
    const [siteMaxVis, setSiteMaxVis] = useState();
    const [siteSuitable, setSiteSuitable] = useState();
    const [siteExperience, setSiteExperience] = useState();

    const [siteLatitude, setSiteLatitude] = useState();
    const [siteLongitude, setSiteLongitude] = useState();

    //const [siteComments, setSiteComments] = useState("");
    //const [siteReview, setSiteReview] = useState("");
    //const [tempImage, setTempImage] = useState();

    const [mainImage, setMainImage] = useState();



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
            setSiteCountry(site.country);
            setSiteImages(site.images);
            setSiteType(site.siteType);
            setSiteAccess(site.access);
            setSiteDescription(site.description);
            setSiteAvgDepth(site.avgDepth);
            setSiteMaxDepth(site.maxDepth);
            setSiteMinTemp(site.minTemp);
            setSiteMaxTemp(site.maxTemp);
            setSiteMinVis(site.minVis);
            setSiteMaxVis(site.maxVis);
            setSiteSuitable(site.suitable);
            setSiteExperience(site.experience);

            setSiteLongitude(site.longitude);
            setSiteLatitude(site.latitude);

            setSiteLatitude(site.latitude);
            setSiteLongitude(site.longitude);

            setSelectedSite(site);
            setIsLoading(false);

            setMainImage(site.images[0]);
    
          } catch (error) {
           console.log(error);
           //setIsLoading(true);
          }
        }

        getSite();
  
    },[]);


    const imageHandler = (image) => {
        setMainImage(image);
    }
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
                  <a target="_blank" href={"http://www.google.com/search?q=" + siteName + "%2C+" + siteArea + "%2C+" + siteCountry}>{siteName}, {siteArea}, {siteCountry}</a> {/* Should be a link to the map / google maps of the area?? */}
                </div>
                

                {/* //TODO: IMAGE GRID CONTAINER ////////////////// */}
                <div className={classes.divesite__imageGridContainer}>
                  <div className={`${classes.image} ${classes.image__1}`}>
                    <img className={classes.image} src={'http://localhost:8080/' + mainImage}/>
                  </div>

                  <div className={classes.rightContainer}>

                    {siteImages.map(image => (
                        <div className={classes.imageContainer} onClick={() => {
                          // setTempImage(firstImage);
                          imageHandler(image);
                        }}>
                          <img className={classes.image} src={'http://localhost:8080/' + image}/>
                        </div>
                    ))}





                  </div>

                </div>

                {/* //TODO: END IMAGE GRID CONTAINER ////////////////// */}

                {/* USE FLEXBOX COLUMN */}
                <div className={classes.divesite__nameContainer}>
                    <h3 className={classes.name}>{siteName}</h3>
                    <h3 className={classes.name}>{siteArea}, {siteCountry}</h3>
                    <a target="_blank" href={"http://www.google.com/search?q=" + siteName + "%2C+" + siteArea + "%2C+" + siteCountry}>{siteName}, {siteArea}, {siteCountry}</a> {/* Should be a link to the map / google maps of the area?? */}
                    <a target="_blank" href={"https://maps.google.com/?q=" + siteLatitude + "," + siteLongitude}><GoogleMapSVG className={classes.googleMapSVG}/></a>
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
                        <span>Access from {siteAccess}</span>
                      </div>
                    </div>
                    <div className={classes.point}>
                      <ReefSVG className={classes.point__icon}/>
                      <div className={classes.point__text}>            
                        <span>{siteType} Dive</span>
                      </div>
                    </div>
                    <div className={classes.point}>
                      <DepthSVG className={classes.point__icon}/>   
                      <div className={classes.point__text}>         
                        <span>Max Depth: {siteMaxDepth}m</span>
                        <span>Average Depth: {siteAvgDepth}m</span>
                      </div>
                    </div>
                    <div className={classes.point}>
                      <XpSVG className={classes.point__icon}/>  
                      <div className={classes.point__text}>          
                        <span>{siteExperience}</span>
                        <span>{siteSuitable}</span>
                      </div>
                    </div>
                    <div className={classes.point}>
                      <TemperatureSVG className={classes.point__icon}/>  
                      <div className={classes.point__text}>
                        <span>{siteMinTemp}°C - {siteMaxTemp}°C</span>   
                      </div>       
                    </div>
                    <div className={classes.point}>
                      <VisibilitySVG className={classes.point__icon}/> 
                      <div className={classes.point__text}>           
                        <span>{siteMinVis} - {siteMaxVis}m</span>
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
                  <div className={classes.noReports}>
                      <h3>There are currently no dive reports for this location.</h3>
                      {isAuth ? 
                        <a href="#">Add a Dive Report</a> : 
                        <span onClick={() =>  
                              setAuthDrawer({
                                  open: true,
                                  login: true,
                                  signup: false
                              })}>Log in
                        </span>
                      }
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