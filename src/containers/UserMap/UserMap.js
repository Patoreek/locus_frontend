import React from 'react';

import Map from '../../components/Map/Map';

const UserMap = () => {
    return (
        <Map googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyA-9fLyV56TU5kt5qw3guZ4Vi3BXuDlNts&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ 
                                 height: "90%",
                                 width: "90%",
                                 margin: "0 auto"
                       }}/>}
        containerElement={<div style={{ 
                                 height: "90%",
                                 width: "90%",
                                 margin: "0 auto"
                         }}/>}
        mapElement={<div style={{ 
                             height: "90%",
                             width: "90%",
                             margin: "0 auto"
        }}/>}
        />
    );
};

export default UserMap;