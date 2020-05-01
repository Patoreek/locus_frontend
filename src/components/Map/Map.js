import React, { useContext } from 'react';

import { GoogleMap,
    withScriptjs,
    withGoogleMap } from "react-google-maps";


import { AuthContext } from '../../context/AuthContext';


import AdminMap from './AdminMap/AdminMap';
import UserMap from './UserMap/UserMap';




const Map = (props) => {

    const [isAuth, setIsAuth] = useContext(AuthContext);   
    
    return (
        <GoogleMap
        defaultZoom={12}
        defaultCenter={{lat:-33.928820, lng: 151.209290}}
        onClick={props.onMapClick}
        >

        {isAuth && (
            <AdminMap/>
        )}


        {!isAuth && (
            <UserMap/>
        )}

        </GoogleMap>
    );
};

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;