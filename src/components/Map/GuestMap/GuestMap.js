
import React, { useState, useEffect, useContext } from 'react';

import {Popover, OverlayTrigger, Button} from 'react-bootstrap';

import {
    Marker,
    InfoWindow
} from 'react-google-maps';

import { AuthContext,
         FavButtonContext } from '../../../context/AuthContext';

import { DiveSitesContext,
         SiteContext,
         LoadDiveSiteContext,
         DetailsContext } from '../../../context/DiveSiteContext';

    

import shoreIcon from '../../../images/locationIcons/ShoreLocation.svg';
import boatIcon from '../../../images/locationIcons/BoatLocation.svg';

import shoreIconCircle from '../../../images/locationIcons/shoreIconCircle.png';
import boatIconCircle from '../../../images/locationIcons/boatIconCircle.png';

import WeatherContainer from '../../../containers/WeatherContainer/WeatherContainer';
import PhotoContainer from './PhotosContainer/PhotoContainer';
import StarRating from '../../StarRating/StarRating';
import FavouriteButton from '../../Buttons/FavouriteButton/FavouriteButton';
import EllipsesButton from '../../Buttons/EllipsesButton/EllipsesButton';


import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';

import classes from './GuestMap.module.css';

const GuestMap = () => {

    const [selectedSite, setSelectedSite] = useContext(SiteContext);

    const [moreDetails, setMoreDetails] = useContext(DetailsContext);

    const [diveSites, setDiveSites] = useContext(DiveSitesContext);

    //const [moreDetails, setMoreDetails] = useContext(DetailsContext);

    const [isAuth, setIsAuth] = useContext(AuthContext);

    // const [favButton, setFavButton] = useState(true);
    const [favButton, setFavButton] = useContext(FavButtonContext);

    const loadDiveSites = useContext(LoadDiveSiteContext);

    const [isLoading, setIsLoading] = useState(true);

    





    useEffect(() => {
       
        loadDiveSites()
        .then(done => {
            console.log(done);
            if (done) {
                console.log('IT IS DONE!');
                setIsLoading(false);
                console.log(diveSites);
            }
        })
        .catch(err => {
            console.log(err);
            setIsLoading(false);
        });

    }, []);

    
    

    


    const moreDetailsHandler = () => {
        setMoreDetails(true);
    }

    // const commentHandler = () => {
    //     console.log('Commenting on Site');
        
    // }

    const style = {
        backgroundColor: "rgba(255, 255, 255, 0.75)",
        padding: "0.5vw 1vw 0vw 1vw",
        borderLeft: "1px solid slateblue",
        borderTop: "1px solid slateblue",
        borderBottom: "1px solid slateblue",
        overflow: "hidden",
        borderRadius: "0.2vw 0vw 0vw 0vw"
    }

    const totalRatingStyle = {
        display:"none"
    }


    // const popover = (
    //     <Popover id="popover-basic">
    //       <Popover.Title as="h3">Popover right</Popover.Title>
    //       <Popover.Content>
    //        <Button> Share </Button>
    //        <Button> Report </Button>
    //       </Popover.Content>
    //     </Popover>
    //   );

    const onMarkerClustererClick = (markerClusterer) => {
        const clickedMarkers = markerClusterer.getMarkers();
        //console.log(`Current clicked markers length: ${clickedMarkers.length}`)
        //console.log(clickedMarkers);
      }

    

    return (
        <div>
            {!isLoading && (
                <div>
                <MarkerClusterer
                    onClick={onMarkerClustererClick}
                    averageCenter
                    gridSize={20}
                    maxZoom={11}
                    defaultZoomOnClick
                >
                { diveSites.map(site => (
                    <Marker 
                    key={site._id}
                    position={{
                        lat: parseFloat(site.latitude),
                        lng: parseFloat(site.longitude)
                    }}
                    onClick={() =>{
                        setSelectedSite(site);
                    }}
                    icon={{
                    url: site.siteType === "1" ? shoreIcon : boatIcon,
                    scaledSize: new window.google.maps.Size(60, 60)
                    }}
                    />
                ))}
                </MarkerClusterer>

                {selectedSite && ( /* OVERLAYVIEW is needed here for custom CSS and window properties*/
                    <InfoWindow
                        position={{
                            lat: parseFloat(selectedSite.latitude),
                            lng: parseFloat(selectedSite.longitude)
                        }}
                        onCloseClick={() => {
                            setSelectedSite(null);
                        } }
                    >
                        <div className={classes.siteContainer}>
                <div className={classes.siteImageContainer} 
                     onClick={() => moreDetailsHandler(selectedSite)}>

                    <img src={'http://localhost:8080/' + selectedSite.images[0]}
                        className={classes.siteImage}
                    />
                </div>

                <div className={classes.favButtonContainer}>
                    {isAuth ? <FavouriteButton site={selectedSite}/> : null}
                </div>

                <div className={classes.siteRatingsContainer}>
                    <StarRating siteRatings = {selectedSite.ratings}
                                guestMapStyle={style}
                                totalRatingStyle={totalRatingStyle}/>
                </div>


                <div className={classes.siteNameContainer}>
                    <h5  className={classes.siteName}
                         onClick={() => moreDetailsHandler(selectedSite)}>
                             {selectedSite.name}, {selectedSite.area}
                    </h5>
                    <div className={classes.ellipsesButtonContainer}>
                        <EllipsesButton/>
                    </div>
                    
                </div>

                <div className={classes.siteDescriptionContainer}>
                    <p> {selectedSite.description} </p>
                    <div className={classes.moreDetailsButtonContainer}>
                    <Button onClick={() => moreDetailsHandler(selectedSite)}
                            className={classes.moreDetailsButton}
                            >More Details...</Button>
                    </div>
                </div>
            
            </div>
                </InfoWindow>
                )}
                </div>
            )}
        </div>
    );
};

export default GuestMap;



/// 