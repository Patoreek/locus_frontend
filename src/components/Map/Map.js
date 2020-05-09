import React, { useContext, useState, useEffect } from 'react';

import { GoogleMap,
    withScriptjs,
    withGoogleMap } from "react-google-maps";


import { AuthContext, UserOnMapContext } from '../../context/AuthContext';


import UserMapContainer from './UserMapContainer/UserMapContainer';
import GuestMap from './GuestMap/GuestMap';




const Map = (props) => {

    const [isAuth, setIsAuth] = useContext(AuthContext);
    const [isUserOnMap, setIsUserOnMap] = useContext(UserOnMapContext);  
    
    const [guestMap, setGuestMap] = useState(true);

   

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
    },[])

    
    return (
        <GoogleMap
        defaultZoom={12}
        defaultCenter={{lat:-33.928820, lng: 151.209290}}
        onClick={props.onMapClick}
        >

        {!guestMap && (
            <UserMapContainer/>
        )}


        {guestMap && (
            <GuestMap/>
        )}

        </GoogleMap>
    );
};

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;