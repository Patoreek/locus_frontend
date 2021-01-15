import React, { useState, useContext, useEffect } from "react";

import classes from "./GuestView.module.scss";

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
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyA-9fLyV56TU5kt5qw3guZ4Vi3BXuDlNts&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={
          <div
            style={{
              height: "97vh",
              width: "45vw",
              display: "inline-block",
              transition: "1s ease",
            }}
          />
        }
        containerElement={
          <div
            style={{
              height: "97vh",
              width: "45vw",
              display: "inline-block",
              boxSizing: "border-box",
              transition: "1s ease",
            }}
          />
        }
        mapElement={
          <div
            style={{
              height: "97vh",
              width: "45vw",
              display: "inline-block",
              transition: "1s ease",
            }}
          />
        }
        onMapClick={onMapClick}
      />
    </div>
  );
};

export default GuestView;
