import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';

import { GoogleMap,
    withScriptjs,
    withGoogleMap } from "react-google-maps";




import { AuthContext, 
         UserOnMapContext,
         SearchCoordsContext,
         OnMapLoadContext,
         PanToContext,
         MapRefContext } from '../../context/AuthContext';

         import { LoadDiveSiteInBoundsContext, LoadDiveShopsInBoundsContext } from '../../context/DiveSiteContext';

import MySitesMap from './MySitesMap/MySitesMap';
import GuestMap from './GuestMap/GuestMap';
import SearchBarMap from '../SearchBarMap/SearchBarMap';
import Locate from '../Locate/Locate';




const Map = (props) => {

    const [isAuth, setIsAuth] = useContext(AuthContext);
    const [isUserOnMap, setIsUserOnMap] = useContext(UserOnMapContext);  
    const [searchCoordinates, setSearchCoordinates] = useContext(SearchCoordsContext);
    const mapRef = useContext(MapRefContext);
    const loadDiveSitesInBounds = useContext(LoadDiveSiteInBoundsContext);
    const loadDiveShopsInBounds = useContext(LoadDiveShopsInBoundsContext);

    
    const panTo = useContext(PanToContext);
    const onMapLoad = useContext(OnMapLoadContext);

    const [guestMap, setGuestMap] = useState(true);

    const [isLoading, setIsLoading] = useState(true);

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude ] = useState(null);

    const [center, setCenter] = useState({lat: latitude, lng: longitude});
    const [zoom, setZoom] = useState(12);
    const [bounds, setBounds] = useState(); //new LatLngBounds()


    useEffect(() => {
       
        setBounds(new window.google.maps.LatLngBounds());
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
    },[]);


    let timer;

    const onBoundsChanged = () => {
        clearTimeout(timer);
        timer = setTimeout(function() {
        console.log("handleBoundsChanged")
        const lat = mapRef.current.getCenter().lat()
        const lng = mapRef.current.getCenter().lng()
        const mapCenter = {
          lat: lat,
          lng: lng,
        }


        let testLat = 24.22;
        let testLng = 130.50;

        //const mapBounds = mapRef.current.getBounds().contains({lat: testLat, lng: testLng});
        const mapBounds = mapRef.current.getBounds();
        
            //? LAT (UP & DOWN), LNG (LEFT TO RIGHT)
            //? TO DETERMINE THE BOUNDS
            //TODO: CREATE CHECK FUNCTION THAT CHECKS IF SITE IS IN THE BOUNDS. THIS FUNCTION SHOULD BE DONE WHEN GETTING DIVE SITES.
      
            loadDiveSitesInBounds(mapBounds);
            loadDiveShopsInBounds(mapBounds);
        }, 1000);
      }

    
    return (
            <div>
                
                {!isLoading && (
                <GoogleMap
                id="map"
                defaultZoom={zoom}
                defaultCenter={{lat: latitude, lng: longitude}}
                onClick={props.onMapClick}
                ref={onMapLoad}
                panTo={panTo}
                onBoundsChanged={onBoundsChanged}
                >
                {/* <SearchBarMap panTo={panTo}/>
                <Locate panTo={panTo}/> */}
            {!guestMap && (
                    <MySitesMap/>

            )}
    
    
            {guestMap && (
                <GuestMap/>
            )} 
    
            </GoogleMap>
            )}
            
            </div>
       
    );
};

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;