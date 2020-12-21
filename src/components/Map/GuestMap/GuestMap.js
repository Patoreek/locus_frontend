
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
         DetailsContext,
         ShopContext,
         DiveShopsContext } from '../../../context/DiveSiteContext';

    

import markerSVG from '../../../assets/icons/location_blue.svg';
import markerShopSVG from '../../../assets/icons/location_orange.svg';



import StarRating from '../../StarRating/StarRating';
import FavouriteButton from '../../Buttons/FavouriteButton/FavouriteButton';


import {ReactComponent as PhoneSVG} from '../../../assets/icons/phone.svg';
import {ReactComponent as EmailSVG} from '../../../assets/icons/email.svg';
import {ReactComponent as LocationSVG} from '../../../assets/icons/location_default.svg';
import {ReactComponent as WebsiteSVG} from '../../../assets/icons/global.svg';
import {ReactComponent as FacebookSVG} from '../../../assets/icons/facebook.svg';
import {ReactComponent as InstagramSVG} from '../../../assets/icons/instagram.svg';
import {ReactComponent as TwitterSVG} from '../../../assets/icons/twitter.svg';



import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';

import classes from './GuestMap.module.scss';
import './GuestMap.css';

const GuestMap = (props) => {

    const [selectedSite, setSelectedSite] = useContext(SiteContext);
    const [selectedShop, setSelectedShop] = useContext(ShopContext);
    const [moreDetails, setMoreDetails] = useContext(DetailsContext);
    const [diveSites, setDiveSites] = useContext(DiveSitesContext);
    const [diveShops, setDiveShops] = useContext(DiveShopsContext);
    const [isAuth, setIsAuth] = useContext(AuthContext);
    const [favButton, setFavButton] = useContext(FavButtonContext);
    const loadDiveSitesInBounds = useContext(LoadDiveSiteInBoundsContext);
    const [isLoading, setIsLoading] = useState(true);


    const onMarkerClustererClick = (markerClusterer) => {
        const clickedMarkers = markerClusterer.getMarkers();
        //console.log(`Current clicked markers length: ${clickedMarkers.length}`)
        //console.log(clickedMarkers);
    }

    

    return (
        <div>
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

                <MarkerClusterer
                    onClick={onMarkerClustererClick}
                    averageCenter
                    gridSize={20}
                    maxZoom={11}
                    defaultZoomOnClick
                >

                {diveShops.map(shop => (
                    <Marker 
                    key={shop._id}
                    position={{
                        lat: parseFloat(shop.latitude),
                        lng: parseFloat(shop.longitude)
                    }}
                    onClick={() =>{
                        console.log(shop);
                        setSelectedShop(shop);
                    }}
                    icon={{
                    url: markerShopSVG,
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
                                        <span>{selectedSite.name} · {selectedSite.area}, {selectedSite.country}</span>
                                </a>
                                </h5>
                                
                            </div>

                            <div className={classes.site__descriptionContainer}>
                                <p className={classes.description}> {selectedSite.description} </p>
                            </div>

                            <div className={classes.site__ratingsContainer}>
                                {/* <StarRating siteRatings = {selectedSite.ratings}/> */}
                            </div>
                        </div>
                </InfoWindow>
                )}

                {selectedShop && ( /* OVERLAYVIEW is needed here for custom CSS and window properties*/
                <InfoWindow
                    position={{
                        lat: parseFloat(selectedShop.latitude),
                        lng: parseFloat(selectedShop.longitude)
                    }}
                    onCloseClick={() => {
                        setSelectedShop(null);
                        setSelectedSite(null);
                    } }
                >       
 
                    <div className={classes.shop}>
                            <div className={classes.shop__imageContainer}>
                                <a href={"/diveshop/" + selectedShop._id}>
                                    <img src={'http://localhost:8080/' + selectedShop.logo}
                                        className={classes.image}
                                    />
                                </a>
                            </div>
                        
                            <div className={classes.shop__nameContainer}>
                                <a href={"/diveshop/" + selectedShop._id} className={classes.name}>
                                        <span>{selectedShop.name}</span>
                                        <br/>
                                </a>
                            </div>

                            <div className={classes.shop__addressContainer}>
                                 {/* Marker Icon */}
                                 <LocationSVG className={`${classes.icon} ${classes.icon__location}`}/>
                                <a href={"https://www.google.com/search?q=" + selectedShop.address}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    {selectedShop.address}
                                    </a>        
                            </div>

                            <div className={classes.shop__phoneContainer}>
                                {/* Phone Icon */}
                                <PhoneSVG className={`${classes.icon} ${classes.icon__phone}`}/>
                                <a href={"tel:" + selectedShop.phone}>{selectedShop.phone}</a>        
                            </div>


                            <div className={classes.shop__emailContainer}>
                                 {/* Email Icon */}
                                <EmailSVG className={`${classes.icon} ${classes.icon__email}`}/>
                                <a href={"mailto:" + selectedShop.email}>{selectedShop.email}</a>        
                            </div>

                            <div className={classes.shop__websiteContainer}>
                                 {/* Global Icon */}
                                <WebsiteSVG className={`${classes.icon} ${classes.icon__website}`}/>
                                <a  href={selectedShop.website}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    {selectedShop.website}
                                    </a>        
                            </div>

                            {/* <div className={classes.socialsContainer}>
                                <div className={classes.socialsContainer__facebookContainer}>
                                    <a  href={selectedShop.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                        <FacebookSVG className={`${classes.icon} ${classes.icon__facebook}`}/>
                                    </a>
                                </div>
                                <div className={classes.socialsContainer__instagramContainer}>
                                    <a  href={selectedShop.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                        <InstagramSVG className={`${classes.icon} ${classes.icon__instagram}`}/>
                                    </a>
                                </div>
                                <div className={classes.socialsContainer__twitterContainer}>
                                    <a  href={selectedShop.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                        <TwitterSVG className={`${classes.icon} ${classes.icon__twitter}`}/>
                                    </a>
                                </div>
                            </div> */}
                    </div>
                   
                </InfoWindow>
            )}


                </div>
        
        </div>
    );
};

export default GuestMap;



/// 