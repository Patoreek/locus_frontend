import React from 'react';

import { Button } from 'react-bootstrap';

import classes from './Locate.module.css'

const Locate = (props) => {
    const panTo = props.panTo;
    
    return (
        <Button className={classes.locateButton}
                onClick={() => {
                    navigator.geolocation.getCurrentPosition((position) => {
                        console.log(position);
                        panTo({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        })
                    },
                    (err) => console.log(err),
                    ()=> null);
                }}>My Location</Button>
    );
};

export default Locate;