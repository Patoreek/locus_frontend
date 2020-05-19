import React, { useContext, useState, useEffect } from 'react';

import {Button, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';

import { PanelSizeContext, MapSizeContext } from '../../../context/AuthContext';

import classes from './ToggleButtons.module.css';

const ToggleButtons = () => {

    const [ panelSize, setPanelSize ] = useContext(PanelSizeContext);
    const [ mapSize, setMapSize ] = useContext(MapSizeContext);

    const [value, setValue] = useState([])

    // useEffect(() => {
    //     //changeSize();
    // }, [mapButtonPressed, panelButtonPressed]);

    const changeSize = () => {
        // if (mapButtonPressed && !panelButtonPressed){
        //     console.log('Map Button is pressed.');
        //     setPanelSize("10vw");
        //     setMapSize("90vw");
        // }
        // if (panelButtonPressed && !mapButtonPressed){
        //     console.log('Panel Button is pressed.');
        //     setPanelSize("100vw");
        //     setMapSize("0vw");
        // }
        // if (panelButtonPressed && mapButtonPressed){
        //     console.log('BOTH BUTTONS ARE PRESSED');
        //     setPanelSize("50vw");
        //     setMapSize("50vw");
        // }
        // if (!panelButtonPressed && !mapButtonPressed){
        //     console.log('None are pressed. Default View');
        //     setPanelSize("30vw");
        //     setMapSize("70vw");
        // }
    }

    const panelHandler = (e) => {
            e.preventDefault();
            //console.log(panelButtonPressed);
            //setPanelButtonPressed(!panelButtonPressed);

    } 

    const mapHandler = (e) => {
        e.preventDefault();
        //setMapButtonPressed(!mapButtonPressed);   
    } 

    const handleChange = (val) => {
        //console.log(val[0]);
        //console.log(val[1]);
        setValue(val);

        if (val[0] === "Panel" || val[1] === "Panel"){
            if (val[0] === "Map" || val[1] === "Map"){
                console.log('Both are active');
                setPanelSize("50vw");
                setMapSize("50vw");

            } else {
                console.log('Panel is active but Map is not');
                setPanelSize("100vw");
                setMapSize("0vw");
            }
        }

        if (val[0] === "Map" || val[1] === "Map"){
            if (val[0] !== "Panel" && val[1] !== "Panel") {
                console.log('Map is active but Panel is not');
                setPanelSize("10vw");
                setMapSize("90vw");
            }
        }

        if (val[0] == null && val[1] == null){
                console.log('None are active');
                setPanelSize("30vw");
                setMapSize("70vw");
            
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

    }

    return (
        <div className={classes.ButtonsContainer}>
            <ToggleButtonGroup type="checkbox" value={value} className="mb-2" onChange={handleChange}>
                <ToggleButton value={"Panel"}>Panel</ToggleButton>
                <ToggleButton value={"Map"}>Map</ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
};

export default ToggleButtons;