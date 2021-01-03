import React, { useContext, useState, useEffect, useRef, useCallback } from 'react';

import { GoogleMap,
    withScriptjs,
    withGoogleMap } from "react-google-maps";




import { AuthContext, 
         UserOnMapContext,
         SearchCoordsContext,
         OnMapLoadContext,
         PanToContext,
         MapRefContext,
         GlobalLoaderContext,
         LocationNameContext } from '../../context/AuthContext';

         import { LoadDiveSiteInBoundsContext, LoadDiveShopsInBoundsContext, ScubaFilterContext, SnorkelFilterContext } from '../../context/DiveSiteContext';

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
    const [globalLoader, setGlobalLoader] = useContext(GlobalLoaderContext);  

    const [locationName, setLocationName] = useContext(LocationNameContext);

    const panTo = useContext(PanToContext);
    const onMapLoad = useContext(OnMapLoadContext);

    const [guestMap, setGuestMap] = useState(true);

    const [isLoading, setIsLoading] = useState(true);

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude ] = useState(null);

    const [center, setCenter] = useState({lat: latitude, lng: longitude});
    const [zoom, setZoom] = useState(12);
    const [bounds, setBounds] = useState(); //new LatLngBounds()

    const [startingCoords, setStartingCoords] = useState({ //* COORDINATES FOR SYDNEY, AUSTRALIA
        lat: -33.928820,
        lng: 151.209290,
    });

    const [scubaFilter, setScubaFilter] = useContext(ScubaFilterContext);
    const [snorkelFilter, setSnorkelFilter] = useContext(SnorkelFilterContext);



    useEffect(() => {

        //! TO GET LOCATION OF USER AND POSITION MAP DYNAMICALLY
        // const successLocate = (pos) => {
        //     const crd = pos.coords;
        //     console.log(crd.latitude);
        //     console.log(crd.longitude);
        //     setStartingCoords({
        //         lat: crd.latitude,
        //         lng: crd.longitude,
        //     });
        // }
        // const errorLocate = (err) => {
        //     console.log(err);
        //     console.log('Location access denied / failed.');
        // }
       
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
            //navigator.geolocation.getCurrentPosition(successLocate, errorLocate); //! DYNAMIC LOCATION POSITIONING

            setLatitude(startingCoords.lat);
            setLongitude(startingCoords.lng);
            setIsLoading(false);
        }
    },[]);

    useEffect(() => {
        onBoundsChanged();
        // if (scubaFilter && !snorkelFilter){
        //     console.log('searching for SCUBA Dive Sites only.');
        // }
        // if (snorkelFilter && !scubaFilter){
        //     console.log('searching for Snorkelling Sites only.');
        // }
        // if ((scubaFilter && snorkelFilter) || (!scubaFilter && !snorkelFilter)) {
        //     console.log('searching for All Sites.');
        // }

    }, [scubaFilter, snorkelFilter]);


    let timer;

    const onBoundsChanged = () => {

        // Global Loading Begins for divesites
        setGlobalLoader({
            divesites: true,
            diveshops: true,
        });


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

            if (locationName){
                setLocationName("");
            }
        
            //? LAT (UP & DOWN), LNG (LEFT TO RIGHT)
            //? TO DETERMINE THE BOUNDS
            //TODO: CREATE CHECK FUNCTION THAT CHECKS IF SITE IS IN THE BOUNDS. THIS FUNCTION SHOULD BE DONE WHEN GETTING DIVE SITES.
            loadDiveSitesInBounds(mapBounds, setGlobalLoader);
            loadDiveShopsInBounds(mapBounds, setGlobalLoader);
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