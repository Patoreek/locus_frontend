
import React, { useState, useEffect, useContext } from 'react';

import {
    Marker,
    InfoWindow
} from 'react-google-maps';

import { Modal, 
         Button,
         Tabs,
         Tab } from 'react-bootstrap';



import { EditModalContext,
         DeleteModalContext,
         AddModalContext,
         EditDiveShopModalContext,
         DiveShopAdminContext } from '../../../../context/UserContext';

import { DiveSitesContext,
         DiveShopsContext,
         SiteContext,
         CoordsContext,
         ShopContext,
         LoadDiveSiteContext, } from '../../../../context/DiveSiteContext';


import { AuthContext,
    MapSizeContext,
    PanelSizeContext,
    LocateButtonContext } from '../../../../context/AuthContext';


import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';

import FavouriteButton from '../../../Buttons/FavouriteButton/FavouriteButton';
import StarRating from '../../../StarRating/StarRating';

import { ReactComponent as EditSVG } from '../../../../assets/icons/edit.svg'; 

//  import shoreIconMarker from '../../../../images/locationIcons/ShoreIconMarker.svg';
//  import boatIconMarker from '../../../../images/locationIcons/BoatIconMarker.svg';
import markerSVG from '../../../../assets/icons/location_blue.svg';
import markerShopSVG from '../../../../assets/icons/location_orange.svg';




import EditSiteForm from '../../../Forms/EditSiteForm/EditSiteForm';
import DeleteContainer from '../../../Forms/DeleteContainer/DeleteContainer';
import ImageUpload from '../../../ImageUpload/ImageUpload';
import CommonFeatures from '../../../Forms/EditSiteForm/CommonFeatures/CommonFeatures';


import {ReactComponent as PhoneSVG} from '../../../../assets/icons/phone.svg';
import {ReactComponent as EmailSVG} from '../../../../assets/icons/email.svg';
import {ReactComponent as LocationSVG} from '../../../../assets/icons/location-marker.svg';
import {ReactComponent as WebsiteSVG} from '../../../../assets/icons/global.svg';
import {ReactComponent as FacebookSVG} from '../../../../assets/icons/facebook.svg';
import {ReactComponent as InstagramSVG} from '../../../../assets/icons/instagram.svg';
import {ReactComponent as TwitterSVG} from '../../../../assets/icons/twitter.svg';





import classes from './MySitesMap.module.scss';

const MySitesMap = () => {

    const [selectedSite, setSelectedSite] = useContext(SiteContext);
    const [diveSites, setDiveSites] = useContext(DiveSitesContext);
    const [coords, setCoords] = useContext(CoordsContext);

    const [ mapSize, setMapSize ] = useContext(MapSizeContext);

    const [ panelSize, setPanelSize ] = useContext(PanelSizeContext);

    const [locateButtonStyle, setLocateButtonStyle] = useContext(LocateButtonContext); 

    const loadDiveSites = useContext(LoadDiveSiteContext);

    const [isAuth, setIsAuth] = useContext(AuthContext);

    const [showEditModal, setShowEditModal] = useContext(EditModalContext);
    const [showAddModal, setShowAddModal] = useContext(AddModalContext);



    const [showDeleteModal, setShowDeleteModal] = useContext(DeleteModalContext);
    const handleDeleteClose = () => setShowDeleteModal(false);
    const handleDeleteShow = () => setShowDeleteModal(true);


    const [diveShops, setDiveShops] = useContext(DiveShopsContext);
    const [selectedShop, setSelectedShop] = useContext(ShopContext);
    const [editDiveShopModal, setEditDiveShopModal] = useContext(EditDiveShopModalContext);
    const [diveShopAdmin, setDiveShopAdmin] = useContext(DiveShopAdminContext);






    // useEffect(() => {
    //     loadDiveSites();
    // }, []); //remove diveSites for performance

    const editSiteHandler = () => {
        //console.log('[Selected Site]' + selectedSite);
            setShowDeleteModal(false);
            setShowEditModal(true);
    }


    const onMarkerClustererClick = (markerClusterer) => {
        const clickedMarkers = markerClusterer.getMarkers();
        //console.log(`Current clicked markers length: ${clickedMarkers.length}`)
        //console.log(clickedMarkers);
      }



    return (
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
                        setDiveShopAdmin(true);
                        setEditDiveShopModal(true);
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
                        setShowEditModal(false);
                        //setSelectedShop(null);
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
                                <p className={classes.diveType}> Shore Dive · Great for Scuba </p>
                            </div>

                         
                            <div className={classes.site__editContainer}>
                                <EditSVG className={classes.edit} onClick={() => {
                                    setShowAddModal(false);
                                    editSiteHandler();
                                }}/>
                            </div>


                            <div className={classes.site__nameContainer}>
                                <h5  className={classes.name}>
                                <a href={"/divesite/" + selectedSite._id}>
                                        {selectedSite.name}, {selectedSite.area}
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

            {selectedShop && ( /* OVERLAYVIEW is needed here for custom CSS and window properties*/
                <InfoWindow
                    position={{
                        lat: parseFloat(selectedShop.latitude),
                        lng: parseFloat(selectedShop.longitude)
                    }}
                    onCloseClick={() => {
                        setShowEditModal(false);
                        setEditDiveShopModal(false);
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
                         
                            {/* <div className={classes.shop__editContainer}>
                                <EditSVG className={classes.edit} onClick={() => {
                                    setShowAddModal(false);
                                    setEditDiveShopModal(true);
                                }}/>
                            </div> */}


                            <div className={classes.shop__nameContainer}>
                                <a href={"/diveShops/" + selectedShop._id} className={classes.name}>
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

                            <div className={classes.socialsContainer}>
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
                            </div>

            
                    </div>
                   
                </InfoWindow>
            )}  

            //! Make SelectedShop
            
        </div>
    );
};

export default MySitesMap;



/// 