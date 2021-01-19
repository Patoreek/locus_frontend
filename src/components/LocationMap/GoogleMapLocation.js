import React from "react";

import LocationMap from "./LocationMap";

const GoogleMapLocation = (props) => {
  return (
    <LocationMap
      googleMapURL={process.env.REACT_APP_GOOGLE_MAPS_KEY}
      loadingElement={
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "inline-block",
            transition: "1s ease",
          }}
        />
      }
      containerElement={
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "inline-block",
            boxSizing: "border-box",
            transition: "1s ease",
          }}
        />
      }
      mapElement={
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "inline-block",
            transition: "1s ease",
          }}
        />
      }
      location={props.location}
    />
  );
};

export default GoogleMapLocation;
