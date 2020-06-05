
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
         DeleteModalContext } from '../../../../context/UserContext';

import { DiveSitesContext,
         SiteContext,
         CoordsContext,
         LoadDiveSiteContext } from '../../../../context/DiveSiteContext';

import { useMediaQuery } from '../../../../CustomHooks/useMediaQuery';

import { AuthContext,
    SearchBarContext,
    MapSizeContext,
    PanelSizeContext,
    LocateButtonContext } from '../../../../context/AuthContext';


import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';


// import shoreIcon from '../../../../images/locationIcons/ShoreLocation.svg';
// import boatIcon from '../../../../images/locationIcons/BoatLocation.svg';

 import shoreIconMarker from '../../../../images/locationIcons/ShoreIconMarker.svg';
 import boatIconMarker from '../../../../images/locationIcons/BoatIconMarker.svg';
import EditSiteForm from '../../../Forms/EditSiteForm/EditSiteForm';
import DeleteContainer from '../../../Forms/DeleteContainer/DeleteContainer';
import ImageUpload from '../../../ImageUpload/ImageUpload';
import CommonFeatures from '../../../Forms/EditSiteForm/CommonFeatures/CommonFeatures';

import classes from './MySitesMap.module.css';

const MySitesMap = () => {

    const [selectedSite, setSelectedSite] = useContext(SiteContext);
    const [diveSites, setDiveSites] = useContext(DiveSitesContext);
    const [coords, setCoords] = useContext(CoordsContext);

    const [ mapSize, setMapSize ] = useContext(MapSizeContext);

    const [ panelSize, setPanelSize ] = useContext(PanelSizeContext);

    const [searchBarStyle, setSearchBarStyle] = useContext(SearchBarContext);

    const [locateButtonStyle, setLocateButtonStyle] = useContext(LocateButtonContext); 

    const loadDiveSites = useContext(LoadDiveSiteContext);

    const [isAuth, setIsAuth] = useContext(AuthContext);

    const [showEditModal, setShowEditModal] = useContext(EditModalContext);
    const handleEditClose = () => setShowEditModal(false);
    const handleEditShow = () => setShowEditModal(true);

    const [showDeleteModal, setShowDeleteModal] = useContext(DeleteModalContext);
    const handleDeleteClose = () => setShowDeleteModal(false);
    const handleDeleteShow = () => setShowDeleteModal(true);

    const [key, setKey] = useState('general');

    const isMobile = useMediaQuery('(max-width: 800px)');


    useEffect(() => {


        if (isMobile) {
            setMapSize("100vw");
            setPanelSize("0vw");
            setSearchBarStyle({
                width: "70vw",
                left: "10vw",
                display: null
            });
            // setLocateButtonStyle({
            //     left: "80vw",
            //     display: null
            // })
        }


        loadDiveSites();
    }, []); //remove diveSites for performance

    const editSiteHandler = () => {
        //console.log('[Selected Site]' + selectedSite);
            setShowDeleteModal(false);
            setShowEditModal(true);
    }


    const showDeleteForm = () => {
        setShowEditModal(false);
        setShowDeleteModal(true);
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
                   url: site.siteType === "1" ? shoreIconMarker : boatIconMarker,
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
                    <div className={classes.siteImageContainer}>

                        <img src={'http://localhost:8080/' + selectedSite.images[0]}
                            className={classes.siteImage}
                        />
                    </div>

                    <div className={classes.siteNameContainer}>
                        <h5  className={classes.siteName}>
                                {selectedSite.name}, {selectedSite.area}
                        </h5>
                    </div>

                    <div className={classes.siteDescriptionContainer}>
                        <p className={classes.siteDescription}> {selectedSite.description} </p>
                        <div className={classes.moreDetailsButtonContainer}>
                        </div>
                    </div>

                    <div className={classes.editButtonContainer}>
                        <Button 
                            variant="info"
                            onClick={() =>{
                                setSelectedSite(selectedSite);
                                editSiteHandler();
                            }}
                            className={classes.editButton}>
                            Edit
                        </Button> 
                    </div>

                    <div className={classes.deleteButtonContainer}>
                        <Button 
                            variant="danger"
                            onClick={() =>{
                                setSelectedSite(selectedSite);
                                showDeleteForm();
                            }}
                            className={classes.deleteButton}>
                            Delete
                        </Button> 
                    </div>
            
                </div>
                   
                </InfoWindow>
            )}

            <Modal  show={showEditModal} 
                    onHide={handleEditClose}
                    dialogClassName={classes.EditModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title className={classes.EditModalHeader}>Edit Dive Site</Modal.Title>
                </Modal.Header>
                <Modal.Body className={classes.EditModalBody}>


                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                    >
                    <Tab eventKey="general" title="General">
                        <EditSiteForm/>
                    </Tab>
                    <Tab eventKey="features" title="Features">
                        <CommonFeatures/>
                    </Tab>
                    <Tab eventKey="images" title="Images">
                        <ImageUpload/>
                    </Tab>
                    </Tabs>
                    
                    





                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEditClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal  show={showDeleteModal} 
                    onHide={handleDeleteClose}
                    dialogClassName={classes.DeleteModal}
            >
                <Modal.Header className={classes.DeleteModalHeader} closeButton>
                    <Modal.Title>Delete Dive Site</Modal.Title>
                </Modal.Header>
                <Modal.Body className={classes.DeleteModalBody}>
                    <DeleteContainer/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            
        </div>
    );
};

export default MySitesMap;



/// 