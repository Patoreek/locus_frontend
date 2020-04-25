import React, { useState } from 'react';


import { GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker,
    InfoWindow,
    OverlayView } from 'react-google-maps';

import * as siteData from "../../data/diveSites.json";
import shoreIcon from '../../images/locationIcons/ShoreLocation.svg';
import boatIcon from '../../images/locationIcons/BoatLocation.svg';

import shoreIconCircle from '../../images/locationIcons/shoreIconCircle.png';
import boatIconCircle from '../../images/locationIcons/boatIconCircle.png';

import classes from './Map.module.css';

const center = { lat: -33.928820, lng: 151.209290 };

const Map = () => {


    const [selectedSite, setSelectedSite] = useState(null);


    return (
        <GoogleMap
        defaultZoom={12}
        defaultCenter={{lat:-33.928820, lng: 151.209290}}
        >
        {siteData.diveSites.map(site => (
            <Marker 
                key={site.id}
                position={{
                    lat: site.latitude,
                    lng: site.longitude
                }}
                onClick={() =>{
                    setSelectedSite(site);
                }}
                icon={{
                   url: site.siteType === "Shore" ? shoreIcon : boatIcon,
                   scaledSize: new window.google.maps.Size(60, 60)
                }}
            />
        ))}

            {selectedSite && ( /* OVERLAYVIEW is needed here for custom CSS and window properties*/
                <InfoWindow
                    position={{
                        lat: selectedSite.latitude,
                        lng: selectedSite.longitude
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
                        {/* <div className={classes.descriptionContainer}>
                            <h3>{selectedSite.description}</h3>
                        </div>
                        <div className={classes.depthContainer}>
                            <h3>{selectedSite.depth}</h3>
                        </div>
                        <div className={classes.visibilityContainer}>
                            <h3>{selectedSite.visibility}</h3>
                        </div>
                        <div className={classes.weatherContainer}>
                            <h3>{selectedSite.weather}</h3>
                        </div>
                        {/*  THIS CAN BE IN MORE DETAILS PAGE
                        <div className={classes.waterMapContainer}>
                            <h3>Underwater Map?</h3>
                        </div>
                        
                        <div className={classes.sightsContainer}>
                            <h3>Common Sights e.g. Animals</h3>
                        </div> 

                        <div className={classes.commentsContainer}>
                            <h3><a href="">comments</a></h3>
                        </div>
                        
                        */}
                        <div className={classes.detailsContainer}>
                            <h3><a href="/details">more details</a></h3>
                        </div>
                        <div className={classes.reviewContainer}>
                            <h3>review stars</h3>
                        </div>
                        <div className={classes.buttonsContainer}>
                            <button>Favourite</button>
                            <button>Report</button>
                        </div>
                   
                    </div>
                </InfoWindow>
            ) 
            }


    </GoogleMap>
    );
};


const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;