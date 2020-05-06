import React, { useState, useContext, useEffect } from 'react';

import InformationPanel from '../InformationPanel/InformationPanel';

import { SiteContext,
         CoordsContext } from '../../context/DiveSiteContext';
import { FormContext } from '../../context/UserContext';
import { AuthContext } from '../../context/AuthContext';

import { useHistory} from 'react-router-dom';

import Map from '../../components/Map/Map';
import classes from './UserView.module.css';


const UserView = () => {

        const [coords, setCoords] = useContext(CoordsContext);
        const [ showForm, toggleShowForm ] = useContext(FormContext);
        const [selectedSite, setSelectedSite] = useContext(SiteContext);

        const [isAuth, setIsAuth] = useContext(AuthContext);

        let history = useHistory();
        
        useEffect(() => {
                if (!isAuth) {
                        history.replace('/login');
                }       
        },[]);

        const onMapClick = (event) => {

                setCoords({
                        lat: event.latLng.lat(),
                        lng: event.latLng.lng()
                });
                if (showForm !== "ADD") {
                        toggleShowForm("ADD");
                        setSelectedSite(null);
                       
                } else {
                        toggleShowForm("");
                }
                console.log('[AdminView OnMapClick Selected Site] ' + selectedSite);
                console.log('[AdminView OnMapClick ShowForm] ' + showForm);


        } 


    return (
        <div>
        
            <InformationPanel/>

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
        </div>
        
    );
};

export default UserView;