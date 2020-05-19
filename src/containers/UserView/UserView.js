import React, { useState, useContext, useEffect } from 'react';

import InformationPanel from '../InformationPanel/InformationPanel';
import CreateSiteForm from '../../components/Forms/CreateSiteForm/CreateSiteForm';

import { Button, Modal } from 'react-bootstrap';

import { SiteContext,
         CoordsContext } from '../../context/DiveSiteContext';
import { FormContext } from '../../context/UserContext';
import { AuthContext, LoadingContext } from '../../context/AuthContext';

import { useHistory} from 'react-router-dom';

import Map from '../../components/Map/Map';
import classes from './UserView.module.css';


const UserView = () => {

        const [coords, setCoords] = useContext(CoordsContext);
        const [ showForm, toggleShowForm ] = useContext(FormContext);
        const [selectedSite, setSelectedSite] = useContext(SiteContext);

        const [isAuth, setIsAuth] = useContext(AuthContext);
        const [isLoading, setIsLoading] = useContext(LoadingContext);

        const [userViewLoaded, setUserViewLoaded] = useState(false);

        const [showModal, setShowModal] = useState(false);

        const handleClose = () => setShowModal(false);
        const handleShow = () => setShowModal(true);

        let history = useHistory();

        useEffect(() => {
            // if (!isLoading){
                console.log('[UserView] isBusy in IF = ' + isLoading);
                console.log('[UserView] isAuth in IF = ' + isAuth);
                if (!isAuth){
                    history.replace('/login');
                }
                setUserViewLoaded(true);

                return () => {
                    setUserViewLoaded(false);
                }
            //}
        }, [])
        

        const onMapClick = (event) => {
                setCoords({
                        lat: event.latLng.lat(),
                        lng: event.latLng.lng()
                });
                handleShow();
                // if (showForm !== "ADD") {
                //         toggleShowForm("ADD");
                //         setSelectedSite(null);
                       
                // } else {
                //         toggleShowForm(null);
                // }
                // console.log('[AdminView OnMapClick Selected Site] ' + selectedSite);
                // console.log('[AdminView OnMapClick ShowForm] ' + showForm);


        } 


    return (
        <div>
            {userViewLoaded && (
                <InformationPanel/>
            )}
            {userViewLoaded && (
            <Map googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyA-9fLyV56TU5kt5qw3guZ4Vi3BXuDlNts&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ 
                                        height: "93vh",
                                        width: "70%",
                                        display: "inline-block"
                                        /*border: "2px solid orange"*/
                                }}/>}
                containerElement={<div style={{ 
                                        height: "93vh",
                                        width: "70%",
                                        display: "inline-block",
                                        /*border: "2px solid purple",*/
                                        boxSizing: 'border-box'
                                }}/>}
                mapElement={<div style={{ 
                                        height: "93vh",
                                        width: "100%",
                                        display: "inline-block" 
                                        /*border: "2px solid green"*/          
                }}/>
                }
                onMapClick = {onMapClick}
                coords = {coords}
            />
            )}

            <Modal  show={showModal} 
                    onHide={handleClose}
                    dialogClassName={classes.AddModal}
            >
                <Modal.Header className={classes.AddModalHeader} closeButton>
                    <Modal.Title>Add Dive Site</Modal.Title>
                </Modal.Header>
                <Modal.Body className={classes.AddModalBody}>
                   ADDING DIVE SITE
                    <CreateSiteForm/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>        

        </div>
        
    );
};

export default UserView;