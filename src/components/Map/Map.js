import React, { useContext, useState, useEffect } from 'react';

import { GoogleMap,
    withScriptjs,
    withGoogleMap } from "react-google-maps";


import { AuthContext, 
         UserOnMapContext,
         SearchCoordsContext } from '../../context/AuthContext';


import UserMapContainer from './UserMapContainer/UserMapContainer';
import GuestMap from './GuestMap/GuestMap';




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
        console.log('[Map] isAuth = ' + isAuth);
        console.log('[Map] isUserOnMap = ' + isUserOnMap);
        if (isAuth){
            if(isUserOnMap){
                setGuestMap(true);
            }
            else {
                setGuestMap(false);
            }
        }

        if (searchCoordinates.lat !== null && searchCoordinates.lng !== null) {
            console.log(searchCoordinates);
            setLatitude(searchCoordinates.lat);
            setLongitude(searchCoordinates.lng)
            setIsLoading(false);
        } else {
            console.log('Search Coords is NULL');
            setLatitude(-33.928820);
            setLongitude(151.209290);
            setIsLoading(false);
        }
        
        console.log(latitude);
        console.log(longitude);


    },[])

    
    return (
            <div>
                {!isLoading && (
                <GoogleMap
                defaultZoom={12}
                defaultCenter={{lat: latitude, lng: longitude}}
                onClick={props.onMapClick}
                >
            
            {!guestMap && (
                <UserMapContainer/>
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