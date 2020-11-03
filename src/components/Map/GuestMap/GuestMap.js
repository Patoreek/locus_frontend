
import React, { useState, useEffect, useContext } from 'react';


import {
    Marker,
    InfoWindow
} from 'react-google-maps';

import { AuthContext,
         FavButtonContext,
         MapRefContext } from '../../../context/AuthContext';

import { DiveSitesContext,
         SiteContext,
         LoadDiveSiteInBoundsContext,
         DetailsContext } from '../../../context/DiveSiteContext';

    

import markerSVG from '../../../assets/icons/location_blue.svg';


import StarRating from '../../StarRating/StarRating';
import FavouriteButton from '../../Buttons/FavouriteButton/FavouriteButton';



import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';

import classes from './GuestMap.module.scss';
import './GuestMap.css';

const GuestMap = (props) => {

    const [selectedSite, setSelectedSite] = useContext(SiteContext);

    const [moreDetails, setMoreDetails] = useContext(DetailsContext);

    const [diveSites, setDiveSites] = useContext(DiveSitesContext);

    //const [moreDetails, setMoreDetails] = useContext(DetailsContext);

    const [isAuth, setIsAuth] = useContext(AuthContext);

    // const [favButton, setFavButton] = useState(true);
    const [favButton, setFavButton] = useContext(FavButtonContext);

    const loadDiveSitesInBounds = useContext(LoadDiveSiteInBoundsContext);

    const [isLoading, setIsLoading] = useState(true);

    

    // useEffect(() => {
    //     console.log(diveSites);
    // }, [diveSites]);
        

    


    // const moreDetailsHandler = () => {
    //     setMoreDetails(true);

    // }


    const onMarkerClustererClick = (markerClusterer) => {
        const clickedMarkers = markerClusterer.getMarkers();
        //console.log(`Current clicked markers length: ${clickedMarkers.length}`)
        //console.log(clickedMarkers);
      }

    

    return (
        <div>
            {/* {!isLoading && ( */}
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
                        lat: site.latitude,
                        lng: site.longitude
                    }}
                    onClick={() =>{
                        setSelectedSite(site);
                    }}
                    icon={{
                    url: markerSVG,
                    scaledSize: new window.google.maps.Size(42, 42)
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
                        <div className={classes.site}>
                            <div className={classes.site__imageContainer}>
                                <a href={"/divesite/" + selectedSite._id}>
                                    <img src={'http://localhost:8080/' + selectedSite.images[0]}
                                        className={classes.image}
                                    />
                                </a>
                            </div>

                            <div className={classes.site__diveTypeContainer}>
                                <p className={classes.diveType}> {selectedSite.siteType} Dive · {selectedSite.suitable} </p>
                            </div>

                            {isAuth && ( 
                                <div className={classes.site__favButtonContainer}>
                                    <FavouriteButton site={selectedSite}/>
                                </div>
                            )}


                            <div className={classes.site__nameContainer}>
                                <h5  className={classes.name}>
                                <a href={"/divesite/" + selectedSite._id}>
                                        <span>{selectedSite.name}</span>
                                        <br/>
                                        <span>{selectedSite.area}, {selectedSite.country}</span>
                                </a>
                                </h5>
                                
                            </div>

                            <div className={classes.site__descriptionContainer}>
                                <p className={classes.description}> {selectedSite.description} </p>
                            </div>

                            <div className={classes.site__ratingsContainer}>
                                <StarRating siteRatings = {selectedSite.ratings}/>
                            </div>


                            <div className={classes.site__moreDetailsContainer}>
                                {/* <span onClick={() => moreDetailsHandler(selectedSite)} className={classes.moreDetails}> */}
                                <a href={"/divesite/" + selectedSite._id} className={classes.moreDetails}>
                                    More Details...
                                </a>
                            </div>
            
                        </div>
                </InfoWindow>
                )}
                </div>
            {/* )} */}
        </div>
    );
};

export default GuestMap;



/// 