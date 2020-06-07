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

import shoreIcon from '../../images/locationIcons/ShoreIcon.svg';
import boatIcon from '../../images/locationIcons/BoatIcon.svg';



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


    const goBackHandler = () => {

        setMoreDetails(false);
    }

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    const style = {
      transform: "scale(1.5)"
    }

    const totalRatingStyle = {
      fontSize: "18px"
    }

    const totalRatingsContainerStyle = {
      float: "right",
      // backgroundColor: "aqua",
      paddingLeft: "0px",
      paddingTop: "-2px"

    }

    const starRatingStyleContainer = {
      display:"inline-block",
      margin: "0 auto",
      // backgroundColor: "orange",
      marginBottom: "-10px",
      height: "25px",
      width:"50%"
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
            setIconUrl("http://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png");
            
            console.log(data);

            let weatherArray = [];

            data.daily.map(apiDay => {
              const d = new Date(apiDay.dt * 1000);
              const dayName =  weekday[d.getDay()];
              console.log(dayName);

              weatherArray = [...weatherArray, {
                  day:dayName,
                  temp:(apiDay.temp.day - 273.15).toFixed(1),
                  weather: apiDay.weather[0].main,
                  icon: "http://openweathermap.org/img/w/" + apiDay.weather[0].icon + ".png"
              }]
              
             //console.log(weatherArray);

            });

            setWeatherContent(weatherArray);

      
            // setWeatherContent([...weatherContent, {
            //   day:dayName,
            //   temp:(apiDay.temp.day - 273.15).toFixed(1),
            //   weather: apiDay.weather[0].main,
            //   icon: "http://openweathermap.org/img/w/" + apiDay.weather[0].icon + ".png"
            // }]
            // );


            setIsLoading(false);

            //<div>
              //  <img src={"http://openweathermap.org/img/w/" + apiDay.weather[0].icon + ".png"}/>
              //  <p> Forecast Day {(apiDay.temp.day - 273.15).toFixed(1)}C. Is {apiDay.weather[0].main}</p>
            //</div>

            //const sites = data.site;
        }
        

        getWeather();
    },[]);

    // console.log('WEATHERCONTENT');
    // console.log(weatherContent);
    //console.log(weatherContent);

    return (
      <div className={classes.detailsContainer}>
        <div className={classes.backButtonContainer}>
          <Button onClick={goBackHandler} className={classes.backButton}>Back</Button>
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
        <div className={classes.topHalfContainer}>
          <div className={classes.siteNameContainer}>
            <h2 className={classes.siteName}>
              {siteName}, {siteArea}
            </h2>
          </div>

          <div className={classes.reviewContainer}>
            <StarRating 
              style={style}
              totalRatingStyle={totalRatingStyle}
              totalRatingsContainerStyle={totalRatingsContainerStyle}
              starRatingStyleContainer={starRatingStyleContainer}
            />
          </div>

          <div className={classes.siteTypeContainer}>
            {siteType === "1" && (
              <div>
                <p className={classes.siteType}> Shore Dive</p>
              </div>
            )} 
            {siteType === "2" && (
              <div>
                <p className={classes.siteType}> Boat Dive</p>
            </div>
            )}
          </div>

        </div>
        

{/* 
        <div className={classes.traitsContainer}>
           Here some be some traits such as snorkel spot, plenty of fish, lots of coral,
           easy diving spot, usually good visibility.
        </div> */}

        <div className={classes.sightsContainer}>

        <div className={classes.sightsInnerContainer}>
          <Tabs defaultActiveKey="features" 
                id="uncontrolled-tab-example"
                className={classes.tabsSection}>
              <Tab eventKey="features" title="Features" className={classes.sightsTab}>

                  <h3 className={classes.sightsHeader}>Common sights / features </h3>
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

                  <h3 className={classes.infoHeader}>Information</h3>

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

                  <h3  className={classes.uMapHeader}>Underwater Map</h3>
                      <div className={classes.waterMapContainer}>
                      {/* <p>{siteUnderwaterMap}</p> */}
                      <p>To be added...</p> 
                  </div>
              </Tab>
          </Tabs>
        </div>
            
        </div> 

        {!isLoading && (

          <div className={classes.weatherContainer}>

            <div className={classes.weatherInnerContainer}>

              <div className={classes.weatherInnerTitleContainer}>
                  <h3>Weather</h3>
              </div>

              {weatherContent.map(day => (
                <div className={classes.weatherDayContainer}>
                  <div className={classes.weatherDayNameContainer}>
                    <p>{day.day}</p>
                  </div>
                  <div className={classes.weatherDayIconContainer}>
                    <img src={day.icon}/>
                  </div>
                  <div className={classes.weatherDayTempContainer}>
                    <p>{day.temp}°C</p>
                  </div>
                  {/* <p>{day.weather}</p> */}
                </div>
              ))}

            </div>
            
          </div>
        )}

        <div className={classes.descriptionContainer}>

          <div className={classes.descriptionInnerContainer}>

          <div className={classes.descriptionInnerTitleContainer}>
              <h3>Description</h3>
          </div>
            
            <p  className={classes.description}>{siteDescription}</p>

          </div>
        </div>



        

        <div className={classes.commentsContainer}>
        <h3 className={classes.commentsHeader}><b>{selectedSite.comments.length} Comments</b></h3>
            <Comments/>
        </div>


      </div>
    );
};

export default Details;