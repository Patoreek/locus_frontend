import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';

import { GoogleMap,
    withScriptjs,
    withGoogleMap } from "react-google-maps";

import {
    Marker
} from 'react-google-maps';

import { AuthContext, 
         UserOnMapContext,
         SearchCoordsContext,
         OnMapLoadContext,
         PanToContext,
         MapRefContext,
         GlobalLoaderContext,
         LocationNameContext } from '../../context/AuthContext';

import { LoadDiveSiteInBoundsContext, LoadDiveShopsInBoundsContext } from '../../context/DiveSiteContext';

import markerSVG from '../../assets/icons/location_darkgrey.svg';



const LocationMap = (props) => {

    const mapRef = useContext(MapRefContext);

    

    const [latitude, setLatitude] = useState(props.location.latitude);
    const [longitude, setLongitude ] = useState(props.location.longitude);

    const [zoom, setZoom] = useState(16);


    
    return (
            <div>
                
            <GoogleMap
            id="map"
            defaultZoom={zoom}
            defaultCenter={{lat: latitude, lng: longitude}}
            //onClick={props.onMapClick}
            //ref={onMapLoad}
            //panTo={panTo}
            //onBoundsChanged={onBoundsChanged}
            >

            <Marker 
                key={props.location._id}
                position={{
                    lat: latitude,
                    lng: longitude
                }}
                // onClick={() =>{
                //     setSelectedSite(site);
                // }}
                icon={{
                    url: markerSVG,
                    scaledSize: new window.google.maps.Size(42, 42)
                }}
            />
            

            </GoogleMap>

            
            </div>
       
    );
};

const WrappedMap = withScriptjs(withGoogleMap(LocationMap));

export default WrappedMap;