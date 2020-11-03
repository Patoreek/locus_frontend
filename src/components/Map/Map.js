import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';

import { GoogleMap,
    withScriptjs,
    withGoogleMap } from "react-google-maps";

    import { fitBounds } from 'google-map-react';
    import LatLng from 'google-map-react';


import { AuthContext, 
         UserOnMapContext,
         SearchCoordsContext,
         OnMapLoadContext,
         PanToContext,
         MapRefContext } from '../../context/AuthContext';

         import { LoadDiveSiteInBoundsContext, loadDiveSitesInBoundsContext } from '../../context/DiveSiteContext';

import UserMapContainer from './UserMapContainer/UserMapContainer';
import GuestMap from './GuestMap/GuestMap';
import SearchBarMap from '../SearchBarMap/SearchBarMap';
import Locate from '../Locate/Locate';

import classes from './Map.module.css';




const Map = (props) => {

    const [isAuth, setIsAuth] = useContext(AuthContext);
    const [isUserOnMap, setIsUserOnMap] = useContext(UserOnMapContext);  
    const [searchCoordinates, setSearchCoordinates] = useContext(SearchCoordsContext);
    const mapRef = useContext(MapRefContext);
    const loadDiveSitesInBounds = useContext(LoadDiveSiteInBoundsContext);

    
    const panTo = useContext(PanToContext);
    const onMapLoad = useContext(OnMapLoadContext);

    const [guestMap, setGuestMap] = useState(true);

    const [isLoading, setIsLoading] = useState(true);

//    console.log('SEARCH COORDINATES');
//    console.log(searchCoordinates.lat);
//    console.log(searchCoordinates.lng);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude ] = useState(null);

    const [center, setCenter] = useState({lat: latitude, lng: longitude});
    const [zoom, setZoom] = useState(12);
    const [bounds, setBounds] = useState(); //new LatLngBounds()


    useEffect(() => {
        //console.log('[Map] isAuth = ' + isAuth);
        //console.log('[Map] isUserOnMap = ' + isUserOnMap);
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
        
        //console.log(latitude);
        //console.log(longitude);


    },[]);


    // const mapRef = useRef();
    // const onMapLoad = useCallback((map) => {
    //     //console.log('Map = ' + map);
    //     mapRef.current = map;
    //     //console.log("In onMapLoad");
    //     //console.log(mapRef.current);
    // }, [],);

    // const panTo = useCallback(({ lat, lng }) => {
    //     mapRef.current.panTo({ lat, lng });
    //     //mapRef.current.setZoom(14);
    //   }, []);

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
        //console.log(mapBounds);

        //console.log(bounds);
       // console.log(mapBounds);

        //? LAT (UP & DOWN), LNG (LEFT TO RIGHT)
        //? TO DETERMINE THE BOUNDS
        //TODO: CREATE CHECK FUNCTION THAT CHECKS IF SITE IS IN THE BOUNDS. THIS FUNCTION SHOULD BE DONE WHEN GETTING DIVE SITES.
      
            // here goes an ajax call
            loadDiveSitesInBounds(mapBounds);
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