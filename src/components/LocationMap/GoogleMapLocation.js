import React from "react";

import LocationMap from "./LocationMap";

const GoogleMapLocation = (props) => {
  return (
    <LocationMap
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyA-9fLyV56TU5kt5qw3guZ4Vi3BXuDlNts&v=3.exp&libraries=geometry,drawing,places`}
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
