import React, { useContext, useState, useEffect } from "react";

import { Button, ToggleButtonGroup, ToggleButton } from "react-bootstrap";

import {
  PanelSizeContext,
  MapSizeContext,
  LocateButtonContext,
} from "../../../context/AuthContext";

//!!!!!!!!!! THIS COMPONENT IS CURRENTLY NOT IN USE
import classes from "./ToggleButtons.module.css";

const ToggleButtons = () => {
  const [panelSize, setPanelSize] = useContext(PanelSizeContext);
  const [mapSize, setMapSize] = useContext(MapSizeContext);
  const [locateButtonStyle, setLocateButtonStyle] = useContext(
    LocateButtonContext
  );

  const [value, setValue] = useState([]);

  const handleChange = (val) => {
    //console.log(val[0]);
    //console.log(val[1]);
    setValue(val);

    if (val[0] === "Panel" || val[1] === "Panel") {
      if (val[0] === "Map" || val[1] === "Map") {
        console.log("Both are active");
        setPanelSize("50vw");
        setMapSize("50vw");

        setLocateButtonStyle({
          left: "85vw",
          display: "block",
        });
      } else {
        console.log("Panel is active but Map is not");
        setPanelSize("100vw");

        setLocateButtonStyle({
          left: "0",
          display: "none",
        });
      }
    }

    if (val[0] === "Map" || val[1] === "Map") {
      if (val[0] !== "Panel" && val[1] !== "Panel") {
        console.log("Map is active but Panel is not");
        setPanelSize("10vw");
        setMapSize("90vw");

        setLocateButtonStyle({
          left: "75vw",
          display: "block",
        });
      }
    }

    if (val[0] == null && val[1] == null) {
      console.log("None are active");
      setPanelSize("30vw");
      setMapSize("70vw");

      setLocateButtonStyle({
        left: "80vw",
        display: "block",
      });
    }

    // value.map(button => {
    //     //console.log(button);
    //     if (button === "Map"){
    //         setMapButtonPressed(!mapButtonPressed);
    //     }
    //     if (button === "Panel"){
    //         setPanelButtonPressed(!panelButtonPressed);
    //     }
    // })
    //changeSize();
  };

  return (
    <div className={classes.ButtonsContainer}>
      <ToggleButtonGroup
        type="checkbox"
        value={value}
        className="mb-2"
        onChange={handleChange}
      >
        <ToggleButton value={"Panel"}>Panel</ToggleButton>
        <ToggleButton value={"Map"}>Map</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default ToggleButtons;
