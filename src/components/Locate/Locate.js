import React, { useContext } from 'react';

import { Button } from 'react-bootstrap';
import { MdMyLocation } from "react-icons/md";

import  { LocateButtonContext } from '../../context/AuthContext';



import classes from './Locate.module.css'

const Locate = (props) => {

    const [locateButtonStyle, setLocateButtonStyle] = useContext(LocateButtonContext);


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
                }}
                style = {{
                    left: locateButtonStyle.left,
                    display: locateButtonStyle.display
                }}
                ><MdMyLocation className={classes.icon}/></Button>
    );
};

export default Locate;