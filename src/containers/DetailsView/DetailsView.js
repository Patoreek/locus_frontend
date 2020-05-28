import React, { useState, useContext, useEffect } from 'react';

import { SiteContext,
         DetailsContext } from '../../context/DiveSiteContext';

import { AuthContext } from '../../context/AuthContext';

import { Button,
         Carousel,
         Tab,
         Tabs,
         Table } from 'react-bootstrap';


import StarRating from '../../components/StarRating/StarRating';
import Comments from '../../components/Comments/Comments';
import FavouriteButton from '../../components/Buttons/FavouriteButton/FavouriteButton';
import EllipsesButton from '../../components/Buttons/EllipsesButton/EllipsesButton'; 

import shoreIcon from '../../images/locationIcons/shoreIconPH.jpg';
import boatIcon from '../../images/locationIcons/boatIconPH.jpg';

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

    const [key, setKey] = useState('features');


    const goBackHandler = () => {

        setMoreDetails(false);
    }

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

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
        <div className={classes.backButtonContainer}>
          <Button onClick={goBackHandler}>Back</Button>
        </div>

        <Carousel activeIndex={index} onSelect={handleSelect} className={classes.carousel}>
        {siteImages.map(image => (
          <Carousel.Item>
            <img
              className={classes.carouselImage}
              src={'http://localhost:8080/' + image}
              alt="First slide"
            />
            {/* <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption> */}
          </Carousel.Item>
          ))}
        
        </Carousel>
        <div className={classes.siteTypeContainer}>
            <img
              className={classes.icon}
              src={selectedSite.siteType === "1" ? shoreIcon : boatIcon}
            />
        </div>

        <div className={classes.nameContainer}>
          <h2 className={classes.siteName}>
            {siteName}, {siteArea}
          </h2>
        </div>

        <div className={classes.reviewContainer}>
            <StarRating/>
        </div>

        <div className={classes.descriptionContainer}>
            
            <p  className={classes.description}>{siteDescription}</p>
        </div>

        <div className={classes.weatherContainer}>
            <h3>Current Weather</h3>
            <p>{siteWeather} Celsius</p>
            <p>Check Forecast for this week</p>
        </div>



        <div className={classes.commentsContainer}>
        <h3 className={classes.commentsHeader}><b>{selectedSite.comments.length} Comments</b></h3>
            <Comments/>
        </div>

        <div className={classes.sightsContainer}>

        <Tabs defaultActiveKey="features" 
              id="uncontrolled-tab-example"
              className={classes.tabsSection}>
            <Tab eventKey="features" title="Features" className={classes.sightsTab}>

                <h3>Common sights / features </h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th width={'30%'}>Type</th>
                        <th width={'70%'}>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    {siteFeatures.map(feature => (
                        <tr>
                        <td>{feature.featureType}</td>
                        <td> {feature.name}</td>
                        </tr>
                    ))}
                    </tbody>
                    </Table>



            </Tab>
            <Tab eventKey="info" title="Info" className={classes.sightsTab}>

                <h1>Information</h1>

                {/* <div className={classes.depthContainer}>
                    <h3>Max Depth: {siteDepth}m</h3>
                </div> */}

                <Table striped bordered hover>
                    <tbody>
                        <tr>
                        <td width="30%">Max Depth</td>
                        <td width="70%"> {siteDepth}m</td>
                        </tr>
                    </tbody>
                    </Table>
            </Tab>
            <Tab eventKey="uMap" title="Underwater Map" className={classes.sightsTab}>

                <h3>Underwater Map</h3>
                    <div className={classes.waterMapContainer}>
                    {/* <p>{siteUnderwaterMap}</p> */}
                    <p>To be added...</p> 
                </div>
            </Tab>
        </Tabs>
            
        </div> 


      </div>
    );
};

export default Details;