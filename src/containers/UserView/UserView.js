import React, { useState, useContext, useEffect } from 'react';

import InformationPanel from '../InformationPanel/InformationPanel';


import { SiteContext,
         CoordsContext } from '../../context/DiveSiteContext';
import { AuthContext, 
         LoadingContext, 
         MapSizeContext,
         AccountContext } from '../../context/AuthContext';

import { AddModalContext,
         EditModalContext,
         DeleteModalContext,
         DiveShopAdminContext,
         AddDiveShopModalContext,
         EditDiveShopModalContext,
         DeleteDiveShopModalContext, } from '../../context/UserContext';


import { useHistory} from 'react-router-dom';

import Map from '../../components/Map/Map';
import MobToggleView from '../../components/MobToggleView/MobToggleView';
import classes from './UserView.module.css';


const UserView = (props) => {
  
        const [coords, setCoords] = useContext(CoordsContext);
        const [selectedSite, setSelectedSite] = useContext(SiteContext);
        const [ mapSize, setMapSize ] = useContext(MapSizeContext);
        const [ account, setAccount ] = useContext(AccountContext);


        const [isAuth, setIsAuth] = useContext(AuthContext);
        const [isLoading, setIsLoading] = useContext(LoadingContext);

        const [userViewLoaded, setUserViewLoaded] = useState(false);

        const [showAddModal, setShowAddModal] = useContext(AddModalContext);

        const [showEditModal, setShowEditModal] = useContext(EditModalContext);
        const [showDeleteModal, setShowDeleteModal] = useContext(DeleteModalContext);

        const [diveShopAdmin, setDiveShopAdmin] = useContext(DiveShopAdminContext);

        const [addDiveShopModal, setAddDiveShopModal] = useContext(AddDiveShopModalContext);
        const [editDiveShopModal, setEditDiveShopModal] = useContext(EditDiveShopModalContext);
        const [deleteDiveShopModal, setDeleteDiveShopModal] = useContext(DeleteDiveShopModalContext);


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
           // }
        }, [])
        

        const onMapClick = (event) => {
          
            console.log('CLICKED!');
            console.log(diveShopAdmin);
        //console.log(addRequest);
        
                if (diveShopAdmin){
                    //console.log('using the map for dive shop admin use');
                    setCoords({
                        lat: event.latLng.lat(),
                        lng: event.latLng.lng()
                    });
                    setAddDiveShopModal(true);
                    //setShowEditDiveShopModal(true);
                   // setShowDeleteDiveShopModal(true);
                } 
                else {
                    if (showEditModal) {
                        setShowEditModal(false);
                    }
                    else if (showDeleteModal){
                        setShowDeleteModal(false);
                    } else if (selectedSite !== null){
                        setSelectedSite(null);
                    } else {
                        setCoords({
                            lat: event.latLng.lat(),
                            lng: event.latLng.lng()
                        });
                        handleShow();
                    }        
                    if (showAddModal) {
                            setShowAddModal(true);
                            setSelectedSite(null);
                           
                    } 
                }
                    
               
                    
                
                // console.log('[AdminView OnMapClick Selected Site] ' + selectedSite);


        } 


    return (
        <div className={classes.userViewPage}>
            <MobToggleView/>
            {userViewLoaded && (
                <InformationPanel/>
            )}
            {userViewLoaded && (
            <Map googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyA-9fLyV56TU5kt5qw3guZ4Vi3BXuDlNts&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ 
                                        height: "97vh",
                                        width: '45vw',
                                        display: "inline-block",
                                        transition: "1s ease"
                                        /*border: "2px solid orange"*/
                                }}/>}
                containerElement={<div style={{ 
                                        height: "97vh",
                                        width: '45vw',
                                        display: "inline-block",
                                        /*border: "2px solid purple",*/
                                        boxSizing: 'border-box',
                                        transition: "1s ease"
                                }}/>}
                mapElement={<div style={{ 
                                        height: "97vh",
                                        width: '45vw',
                                        display: "inline-block" 
                                        /*border: "2px solid green"*/          
                }}/>
                }
                onMapClick = {onMapClick}
                coords = {coords}
            />
            )}

              

        </div>
        
    );
};

export default UserView;