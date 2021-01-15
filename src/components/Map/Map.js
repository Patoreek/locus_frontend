import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

import {
  AuthContext,
  UserOnMapContext,
  SearchCoordsContext,
  OnMapLoadContext,
  PanToContext,
  MapRefContext,
  GlobalLoaderContext,
  LocationNameContext,
} from "../../context/AuthContext";

import {
  LoadDiveSiteInBoundsContext,
  LoadDiveShopsInBoundsContext,
  ScubaFilterContext,
  SnorkelFilterContext,
  LoadDiveSitesInBoundsInfiniteContext,
  PanelDiveSitesContext,
  ScrollCounterContext,
  HasMoreDataContext,
} from "../../context/DiveSiteContext";

import MySitesMap from "./MySitesMap/MySitesMap";
import GuestMap from "./GuestMap/GuestMap";
import SearchBarMap from "../SearchBarMap/SearchBarMap";
import Locate from "../Locate/Locate";

const Map = (props) => {
  const [isAuth, setIsAuth] = useContext(AuthContext);
  const [isUserOnMap, setIsUserOnMap] = useContext(UserOnMapContext);
  const [searchCoordinates, setSearchCoordinates] = useContext(
    SearchCoordsContext
  );
  const mapRef = useContext(MapRefContext);
  const loadDiveSitesInBounds = useContext(LoadDiveSiteInBoundsContext);
  const loadDiveShopsInBounds = useContext(LoadDiveShopsInBoundsContext);
  const loadDiveSitesInBoundsInfinite = useContext(
    LoadDiveSitesInBoundsInfiniteContext
  );

  const [globalLoader, setGlobalLoader] = useContext(GlobalLoaderContext);

  const [locationName, setLocationName] = useContext(LocationNameContext);
  const [hasMoreData, setHasMoreData] = useContext(HasMoreDataContext);

  const panTo = useContext(PanToContext);
  const onMapLoad = useContext(OnMapLoadContext);

  const [guestMap, setGuestMap] = useState(true);

  const [isLoading, setIsLoading] = useState(true);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [center, setCenter] = useState({ lat: latitude, lng: longitude });
  const [zoom, setZoom] = useState(12);
  const [bounds, setBounds] = useState(); //new LatLngBounds()

  const [startingCoords, setStartingCoords] = useState({
    //* COORDINATES FOR SYDNEY, AUSTRALIA
    lat: -33.92882,
    lng: 151.20929,
  });

  const [scubaFilter, setScubaFilter] = useContext(ScubaFilterContext);
  const [snorkelFilter, setSnorkelFilter] = useContext(SnorkelFilterContext);

  const [panelDiveSites, setPanelDiveSites] = useContext(PanelDiveSitesContext);

  const [scrollCounter, setScrollCounter] = useContext(ScrollCounterContext);

  useEffect(() => {
    setBounds(new window.google.maps.LatLngBounds());
    if (isAuth) {
      if (isUserOnMap) {
        setGuestMap(true);
      } else {
        setGuestMap(false);
      }
    }

    if (searchCoordinates.lat !== null && searchCoordinates.lng !== null) {
      setLatitude(searchCoordinates.lat);
      setLongitude(searchCoordinates.lng);
      setIsLoading(false);
    } else {
      setLatitude(startingCoords.lat);
      setLongitude(startingCoords.lng);
      setIsLoading(false);
    }
  }, []);

  let timer;

  const onBoundsChanged = () => {
    setGlobalLoader({
      divesites: true,
      diveshops: true,
    });

    clearTimeout(timer);
    timer = setTimeout(function () {
      const lat = mapRef.current.getCenter().lat();
      const lng = mapRef.current.getCenter().lng();
      const mapCenter = {
        lat: lat,
        lng: lng,
      };

      let testLat = 24.22;
      let testLng = 130.5;

      const mapBounds = mapRef.current.getBounds();

      if (locationName) {
        setLocationName("");
      }

      setPanelDiveSites([]);
      setHasMoreData(true);

      loadDiveSitesInBounds(mapBounds, setGlobalLoader);
      loadDiveShopsInBounds(mapBounds, setGlobalLoader);
      loadDiveSitesInBoundsInfinite(mapBounds, "TRUE");
    }, 1000);
  };

  return (
    <div>
      {!isLoading && (
        <GoogleMap
          id="map"
          defaultZoom={zoom}
          defaultCenter={{ lat: latitude, lng: longitude }}
          onClick={props.onMapClick}
          ref={onMapLoad}
          panTo={panTo}
          onBoundsChanged={onBoundsChanged}
        >
          {!guestMap && <MySitesMap />}

          {guestMap && <GuestMap />}
        </GoogleMap>
      )}
    </div>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;
