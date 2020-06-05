import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';

import { GoogleMap,
    withScriptjs,
    withGoogleMap } from "react-google-maps";


import { AuthContext, 
         UserOnMapContext,
         SearchCoordsContext } from '../../context/AuthContext';


import UserMapContainer from './UserMapContainer/UserMapContainer';
import GuestMap from './GuestMap/GuestMap';
import SearchBarMap from '../SearchBarMap/SearchBarMap';
import Locate from '../Locate/Locate';

import classes from './Map.module.css';




const Map = (props) => {

    const [isAuth, setIsAuth] = useContext(AuthContext);
    const [isUserOnMap, setIsUserOnMap] = useContext(UserOnMapContext);  
    const [searchCoordinates, setSearchCoordinates] = useContext(SearchCoordsContext);  

    const [guestMap, setGuestMap] = useState(true);

    const [isLoading, setIsLoading] = useState(true);

//    console.log('SEARCH COORDINATES');
//    console.log(searchCoordinates.lat);
//    console.log(searchCoordinates.lng);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude ] = useState(null);


    useEffect(() => {
        //console.log('[Map] isAuth = ' + isAuth);
        //console.log('[Map] isUserOnMap = ' + isUserOnMap);
        if (isAuth){
            if(isUserOnMap){
                setGuestMap(true);
            }
            else {
                setGuestMap(false);
            }
        }

        if (searchCoordinates.lat !== null && searchCoordinates.lng !== null) {
            //console.log(searchCoordinates);
            setLatitude(searchCoordinates.lat);
            setLongitude(searchCoordinates.lng)
            setIsLoading(false);
        } else {
            //console.log('Search Coords is NULL');
            setLatitude(-33.928820);
            setLongitude(151.209290);
            setIsLoading(false);
        }
        
        //console.log(latitude);
        //console.log(longitude);


    },[]);


    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        //console.log('Map = ' + map);
        mapRef.current = map;
        //console.log("In onMapLoad");
        //console.log(mapRef.current);
    }, [],);

    const panTo = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        //mapRef.current.setZoom(14);
      }, []);

    
    return (
            <div>
                
                {!isLoading && (
                <GoogleMap
                id="map"
                defaultZoom={12}
                defaultCenter={{lat: latitude, lng: longitude}}
                onClick={props.onMapClick}
                ref={onMapLoad}
                panTo={panTo}
                >
                <SearchBarMap panTo={panTo}/>
                <Locate panTo={panTo}/>
            {!guestMap && (
                <div>
                    <div className={classes.overlayInfo}>
                        <p className={classes.overlayText}> Press anywhere on the map to add a Dive Site. To edit an existing site, press on a marker </p>
                    </div>
                    <UserMapContainer/>
                </div>
            )}
    
    
            {guestMap && (
                <GuestMap/>
            )} 
    
            </GoogleMap>
            )}
            
            {/* {isLoading && (
                <div><h1>Loading...</h1></div>
            )} */}

            </div>
       
    );
};

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;