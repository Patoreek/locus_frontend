import React, { useContext, useState } from "react";

import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

import { Marker } from "react-google-maps";

import markerSVG from "../../assets/icons/location_darkgrey.svg";

const LocationMap = (props) => {
  const [latitude, setLatitude] = useState(props.location.latitude);
  const [longitude, setLongitude] = useState(props.location.longitude);

  const [zoom, setZoom] = useState(12);

  return (
    <div>
      <GoogleMap
        id="map"
        defaultZoom={zoom}
        defaultCenter={{ lat: latitude, lng: longitude }}
      >
        <Marker
          key={props.location._id}
          position={{
            lat: latitude,
            lng: longitude,
          }}
          icon={{
            url: markerSVG,
            scaledSize: new window.google.maps.Size(42, 42),
          }}
        />
      </GoogleMap>
    </div>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(LocationMap));

export default WrappedMap;
