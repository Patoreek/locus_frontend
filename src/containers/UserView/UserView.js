import React, { useState, useContext, useEffect } from 'react';

import InformationPanel from '../InformationPanel/InformationPanel';
import CreateSiteForm from '../../components/Forms/CreateSiteForm/CreateSiteForm';

import { Button, Modal } from 'react-bootstrap';

import { SiteContext,
         CoordsContext } from '../../context/DiveSiteContext';
//import { FormContext } from '../../context/UserContext';
import { AuthContext, 
         LoadingContext, 
         MapSizeContext } from '../../context/AuthContext';

import { AddModalContext } from '../../context/UserContext';

import { useHistory} from 'react-router-dom';

import Map from '../../components/Map/Map';
import MobToggleView from '../../components/MobToggleView/MobToggleView';
import classes from './UserView.module.css';


const UserView = () => {

        const [coords, setCoords] = useContext(CoordsContext);
        //const [ showForm, toggleShowForm ] = useContext(FormContext);
        const [selectedSite, setSelectedSite] = useContext(SiteContext);
        const [ mapSize, setMapSize ] = useContext(MapSizeContext);

        const [isAuth, setIsAuth] = useContext(AuthContext);
        const [isLoading, setIsLoading] = useContext(LoadingContext);

        const [userViewLoaded, setUserViewLoaded] = useState(false);

        const [showAddModal, setShowAddModal] = useContext(AddModalContext);

        const handleClose = () => setShowAddModal(false);
        const handleShow = () => setShowAddModal(true);

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
            <MobToggleView/>
            {userViewLoaded && (
                <InformationPanel/>
            )}
            {userViewLoaded && (
            <Map googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyA-9fLyV56TU5kt5qw3guZ4Vi3BXuDlNts&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ 
                                        height: "97vh",
                                        width: mapSize,
                                        display: "inline-block",
                                        transition: "1s ease"
                                        /*border: "2px solid orange"*/
                                }}/>}
                containerElement={<div style={{ 
                                        height: "97vh",
                                        width: mapSize,
                                        display: "inline-block",
                                        /*border: "2px solid purple",*/
                                        boxSizing: 'border-box',
                                        transition: "1s ease"
                                }}/>}
                mapElement={<div style={{ 
                                        height: "97vh",
                                        width: "100%",
                                        display: "inline-block" 
                                        /*border: "2px solid green"*/          
                }}/>
                }
                onMapClick = {onMapClick}
                coords = {coords}
            />
            )}

            <Modal  show={showAddModal} 
                    onHide={handleClose}
                    dialogClassName={classes.AddModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title className={classes.AddModalHeader}>Add Dive Site</Modal.Title>
                </Modal.Header>
                <Modal.Body className={classes.AddModalBody}>
                    <CreateSiteForm/>
                </Modal.Body>
                <Modal.Footer className={classes.AddModalFooter}>
                    <Button variant="secondary"
                            onClick={handleClose}
                            className={classes.CloseAddModalButton}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>        

        </div>
        
    );
};

export default UserView;