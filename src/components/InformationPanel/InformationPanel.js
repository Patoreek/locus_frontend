import React, { useContext, useEffect, useState } from "react";

import GuestPanel from "./GuestPanel/GuestPanel";
import UserPanel from "./UserPanel/UserPanel";

import Spinner from "react-bootstrap/Spinner";

import {
  AuthContext,
  UserOnMapContext,
  PanelSizeContext,
} from "../../context/AuthContext";

import classes from "./InformationPanel.module.scss";

const InformationPanel = (props) => {
  const [isAuth, setIsAuth] = useContext(AuthContext);
  const [isUserOnMap, setIsUserOnMap] = useContext(UserOnMapContext);

  const [guestPanel, setGuestPanel] = useState(true);
  const [panelLoaded, setPanelLoaded] = useState(false);

  const [panelSize, setPanelSize] = useContext(PanelSizeContext);

  let panelDisplay;

  if (panelSize === "0vw") {
    panelDisplay = "none";
  } else {
    panelDisplay = "inline-block";
  }

  useEffect(() => {
    if (isAuth) {
      // IS LOGGED IN
      if (!isUserOnMap) {
        // NOT ON MAP
        setGuestPanel(false);
      }
    }

    setPanelLoaded(true);
  }, []);

  return (
    <div className={classes.infoPanelContainer}>
      {panelLoaded && guestPanel && <GuestPanel />}
      {panelLoaded && !guestPanel && <UserPanel />}
      {!panelLoaded && <Spinner animation="border" />}
    </div>
  );
};

export default InformationPanel;
