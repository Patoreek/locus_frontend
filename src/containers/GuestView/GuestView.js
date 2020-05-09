import React, { useState, useContext } from 'react';

import InformationPanel from '../InformationPanel/InformationPanel';
import Map from '../../components/Map/Map';
import Details from '../DetailsView/DetailsView';

import { AuthContext, UserOnMapContext } from '../../context/AuthContext';

import { CoordsContext } from '../../context/DiveSiteContext';

import { DetailsContext } from '../../context/GuestContext';



import classes from './GuestView.module.css';

const UserView = () => {

        const [isAuth, setIsAuth] = useContext(AuthContext);

        const [coords, setCoords] = useContext(CoordsContext);

        const [moreDetails, setMoreDetails] = useContext(DetailsContext);

        const [isUserOnMap, setIsUserOnMap] = useContext(UserOnMapContext);
        //setIsAuth(false);
        if (isAuth){
            setIsUserOnMap(true);
        }
        const onMapClick = (event) => {

                setCoords({
                        lat: event.latLng.lat(),
                        lng: event.latLng.lng()
                })


        } 

    return (
        <div>
            {/* <InformationPanel/> */}

            {!moreDetails && (

                <Map googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyA-9fLyV56TU5kt5qw3guZ4Vi3BXuDlNts&v=3.exp&libraries=geometry,drawing,places`}
                    loadingElement={<div style={{ 
                                            height:"93vh",
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
                                    }}/>}
                    onMapClick = {onMapClick}
                />

            )}

            {moreDetails && (
                <Details/> 
            )}
                

        </div>
    );
};

export default UserView;