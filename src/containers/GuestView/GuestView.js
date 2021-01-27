import React, { useState, useContext, useEffect } from "react";

import classes from "./GuestView.module.scss";
import { isMobile } from "react-device-detect";

import InformationPanel from "../../components/InformationPanel/InformationPanel";
import Map from "../../components/Map/Map";

import {
  AuthContext,
  UserOnMapContext,
  LocateButtonContext,
} from "../../context/AuthContext";

import { CoordsContext } from "../../context/DiveSiteContext";

const GuestView = () => {
  const [isAuth, setIsAuth] = useContext(AuthContext);

  const [locateButtonStyle, setLocateButtonStyle] = useContext(
    LocateButtonContext
  );

  const [coords, setCoords] = useContext(CoordsContext);

  const [isUserOnMap, setIsUserOnMap] = useContext(UserOnMapContext);

  const [guestViewLoaded, setGuestViewLoaded] = useState(false);

  //setIsAuth(false);
  useEffect(() => {
    document.title = "Locus - Map";

    if (isAuth) {
      setIsUserOnMap(true);
    }
    setGuestViewLoaded(true);
    return () => {
      setGuestViewLoaded(false);
    };
  }, []);

  const onMapClick = (event) => {
    setCoords({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  return (
    <div className={classes.guestView}>
      {guestViewLoaded && <InformationPanel />}

      <Map
        googleMapURL={process.env.REACT_APP_GOOGLE_MAPS_KEY}
        loadingElement={
          <div
            className={`${classes.loadingElement} ${
              isMobile ? classes.mobile : null
            }`}
          />
        }
        containerElement={
          <div
            className={`${classes.containerElement} ${
              isMobile ? classes.mobile : null
            }`}
          />
        }
        mapElement={
          <div
            className={`${classes.mapElement} ${
              isMobile ? classes.mobile : null
            }`}
          />
        }
        onMapClick={onMapClick}
      />
    </div>
  );
};

export default GuestView;
