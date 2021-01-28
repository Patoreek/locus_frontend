import React, { useState, useContext, useEffect } from "react";

import classes from "./MobileSearchPanel.module.scss";
import { isMobile } from "react-device-detect";

import Searchbar from "../../components/Searchbar/Searchbar";

import {
  AuthContext,
  UserOnMapContext,
  LocateButtonContext,
  SearchCoordsContext,
} from "../../context/AuthContext";

import { CoordsContext } from "../../context/DiveSiteContext";

import GuestPanel from "../../components/InformationPanel/GuestPanel/GuestPanel";

const MobileSearchPanel = () => {
  const [isAuth, setIsAuth] = useContext(AuthContext);

  const [locateButtonStyle, setLocateButtonStyle] = useContext(
    LocateButtonContext
  );
  const [searchCoordinates, setSearchCoordinates] = useContext(
    SearchCoordsContext
  );

  const [coords, setCoords] = useContext(CoordsContext);

  const [isUserOnMap, setIsUserOnMap] = useContext(UserOnMapContext);

  const [MobileSearchPanelLoaded, setMobileSearchPanelLoaded] = useState(false);

  const [sites, setSites] = useState([]);

  //setIsAuth(false);
  useEffect(() => {
    document.title = "Locus - Map";

    if (isAuth) {
      setIsUserOnMap(true);
    }
    setMobileSearchPanelLoaded(true);
    return () => {
      setMobileSearchPanelLoaded(false);
    };
  }, []);

  const onMapClick = (event) => {
    setCoords({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  // async function getNearbyDiveSites(lat, lng) {
  //   return fetch(
  //     process.env.REACT_APP_ENV == "production"
  //       ? process.env.REACT_APP_BACKEND + "diveSites/findNearbyDiveSites"
  //       : process.env.REACT_APP_LOCAL_BACKEND + "diveSites/findNearbyDiveSites",
  //     {
  //       method: "POST",
  //       credentials: "include",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         lat: lat,
  //         lng,
  //         lng,
  //         //siteId: siteId,
  //       }),
  //     }
  //   )
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((result) => {
  //       console.log(result.sites);
  //       setSites(result.sites);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  return (
    <div className={classes.mobileSearchPanel}>
      <div className={classes.mobileSearchPanel__searchbar}>
        <Searchbar />
      </div>
      <GuestPanel />
    </div>
  );
};

export default MobileSearchPanel;
