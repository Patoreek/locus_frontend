
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
import ReviewStars from '../../StarRating/StarRating';
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

    
    

    


    const detailsHandler = () => {
        setMoreDetails(true);
    }

    const commentHandler = () => {
        console.log('Commenting on Site');
        
    }

    const popover = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Popover right</Popover.Title>
          <Popover.Content>
           <Button> Share </Button>
           <Button> Report </Button>
          </Popover.Content>
        </Popover>
      );

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
                        <div className={classes.infowindowContainer}>
                            <div className={classes.nameContainer}>
                                <div className={classes.siteTypeContainer}>
                                    <img className={classes.Icon}
                                        src={selectedSite.siteType === "Shore" ? shoreIconCircle : boatIconCircle}/>
                                </div>
                                <h2>{selectedSite.name}, {selectedSite.area}</h2>
                            </div>
                            <div className={classes.mediaContainer}>
                                <PhotoContainer selectedSite={selectedSite}/>
                            </div>
                            
                            <div className={classes.detailsContainer}>
                                <Button variant="link" onClick={detailsHandler}>More Details</Button>
                            </div>
                            <div className={classes.reviewContainer}>
                                <ReviewStars/>
                            </div>
                            {isAuth && (
                                <div className={classes.buttonsContainer}>
                                    <FavouriteButton site={selectedSite}/>
                                    <EllipsesButton/>
                                </div>
                            )} 
            
                   
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