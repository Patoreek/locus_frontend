
import React, { useState, useEffect, useContext } from 'react';

import {
    Marker,
    InfoWindow
} from 'react-google-maps';

import { Modal, Button } from 'react-bootstrap';


import { FormContext } from '../../../../context/UserContext';
import { DiveSitesContext,
         SiteContext,
         CoordsContext,
         LoadDiveSiteContext } from '../../../../context/DiveSiteContext';
import { AuthContext } from '../../../../context/AuthContext';



import shoreIcon from '../../../../images/locationIcons/ShoreLocation.svg';
import boatIcon from '../../../../images/locationIcons/BoatLocation.svg';

import EditSiteForm from '../../../Forms/EditSiteForm/EditSiteForm';
import DeleteContainer from '../../../Forms/DeleteContainer/DeleteContainer';

import classes from './MySitesMap.module.css';

const MySitesMap = () => {

    const [ showForm, toggleShowForm ] = useContext(FormContext);
    const [selectedSite, setSelectedSite] = useContext(SiteContext);
    const [diveSites, setDiveSites] = useContext(DiveSitesContext);
    const [coords, setCoords] = useContext(CoordsContext);

    const loadDiveSites = useContext(LoadDiveSiteContext);

    const [isAuth, setIsAuth] = useContext(AuthContext);

    const [showEditModal, setShowEditModal] = useState(false);
    const handleEditClose = () => setShowEditModal(false);
    const handleEditShow = () => setShowEditModal(true);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleDeleteClose = () => setShowDeleteModal(false);
    const handleDeleteShow = () => setShowDeleteModal(true);

    useEffect(() => {
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


    return (
        <div>
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

            {selectedSite && ( /* OVERLAYVIEW is needed here for custom CSS and window properties*/
                <InfoWindow
                    position={{
                        lat: parseFloat(selectedSite.latitude),
                        lng: parseFloat(selectedSite.longitude)
                    }}
                    onCloseClick={() => {
                        toggleShowForm(null);
                        setSelectedSite(null);
                    } }
                >       
 
                    <div>
                        <h3><b>{selectedSite.name}</b></h3>
                        <h5><b>{selectedSite.area}</b></h5>
                        <div className={classes.buttonsContainer}>
                            <button onClick = {editSiteHandler}>Edit</button>
                            <button onClick = {showDeleteForm}>Delete</button>
                        </div>
                    </div>
                   
                </InfoWindow>
            )}

            <Modal  show={showEditModal} 
                    onHide={handleEditClose}
                    dialogClassName={classes.EditModal}
            >
                <Modal.Header className={classes.EditModalHeader} closeButton>
                    <Modal.Title>Edit Dive Site</Modal.Title>
                </Modal.Header>
                <Modal.Body className={classes.EditModalBody}>
                    Woohoo, you're reading this text in a modal!
                    <EditSiteForm/>
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
                <Modal.Body className={classes.EditModalBody}>
                    Do you want to delete this Dive Site?
                    <DeleteContainer/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDeleteClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            
        </div>
    );
};

export default MySitesMap;



/// 