
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
         AddModalContext } from '../../../../context/UserContext';

import { DiveSitesContext,
         SiteContext,
         CoordsContext,
         LoadDiveSiteContext } from '../../../../context/DiveSiteContext';


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


import EditSiteForm from '../../../Forms/EditSiteForm/EditSiteForm';
import DeleteContainer from '../../../Forms/DeleteContainer/DeleteContainer';
import ImageUpload from '../../../ImageUpload/ImageUpload';
import CommonFeatures from '../../../Forms/EditSiteForm/CommonFeatures/CommonFeatures';

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

            {selectedSite && ( /* OVERLAYVIEW is needed here for custom CSS and window properties*/
                <InfoWindow
                    position={{
                        lat: parseFloat(selectedSite.latitude),
                        lng: parseFloat(selectedSite.longitude)
                    }}
                    onCloseClick={() => {
                        setShowEditModal(false);
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
            
        </div>
    );
};

export default MySitesMap;



/// 