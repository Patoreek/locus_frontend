import React, { useState, useContext, useEffect } from "react";

import InformationPanel from "../../components/InformationPanel/InformationPanel";

import { SiteContext, CoordsContext } from "../../context/DiveSiteContext";
import {
  AuthContext,
  LoadingContext,
  MapSizeContext,
} from "../../context/AuthContext";

import { AddRequestContext, SiteListContext } from "../../context/UserContext";

import { useHistory } from "react-router-dom";

import Map from "../../components/Map/Map";
import classes from "./AddRequest.module.scss";

const AddRequest = (props) => {
  const [coords, setCoords] = useContext(CoordsContext);
  const [selectedSite, setSelectedSite] = useContext(SiteContext);
  const [mapSize, setMapSize] = useContext(MapSizeContext);

  const [isAuth, setIsAuth] = useContext(AuthContext);
  const [isLoading, setIsLoading] = useContext(LoadingContext);

  const [userViewLoaded, setUserViewLoaded] = useState(false);

  const [showAddRequestModal, setShowAddRequestModal] = useContext(
    AddRequestContext
  );
  const [showSiteList, setShowSiteList] = useContext(SiteListContext);

  let history = useHistory();

  useEffect(() => {
    setShowSiteList(false);

    document.title = "Locus - Add Site Request";

    if (!isAuth) {
      history.replace("/login");
    }
    setUserViewLoaded(true);

    return () => {
      setUserViewLoaded(false);
      setShowSiteList(true);
    };
  }, []);

  const onMapClick = (event) => {
    setCoords({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
    setShowAddRequestModal(true);
  };

  return (
    <div className={classes.addRequest}>
      {userViewLoaded && <InformationPanel />}
      {userViewLoaded && (
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
              }}
            />
          }
          onMapClick={onMapClick}
          coords={coords}
        />
      )}
    </div>
  );
};

export default AddRequest;
