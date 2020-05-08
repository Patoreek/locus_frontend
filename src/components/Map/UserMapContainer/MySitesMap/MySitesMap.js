
import React, { useState, useEffect, useContext } from 'react';

import {
    Marker,
    InfoWindow
} from 'react-google-maps';


import { FormContext } from '../../../../context/UserContext';
import { DiveSitesContext,
         SiteContext,
         CoordsContext,
         LoadDiveSiteContext } from '../../../../context/DiveSiteContext';
import { TokenContext, AuthContext } from '../../../../context/AuthContext';



import shoreIcon from '../../../../images/locationIcons/ShoreLocation.svg';
import boatIcon from '../../../../images/locationIcons/BoatLocation.svg';

import classes from './MySitesMap.module.css';

const MySitesMap = () => {

    const [ showForm, toggleShowForm ] = useContext(FormContext);
    const [selectedSite, setSelectedSite] = useContext(SiteContext);
    const [diveSites, setDiveSites] = useContext(DiveSitesContext);
    const [coords, setCoords] = useContext(CoordsContext);

    const loadDiveSites = useContext(LoadDiveSiteContext);

    const [isAuth, setIsAuth] = useContext(AuthContext);

    useEffect(() => {
        loadDiveSites();
    }, []); //remove diveSites for performance

    const editSiteHandler = () => {
        console.log('[Selected Site]' + selectedSite);
        if (showForm !== 'EDIT'){
            toggleShowForm('EDIT');
        } else {
            toggleShowForm(null);
        }
    }


    const showDeleteForm = () => {
        console.log('[Selected Site]' + selectedSite);
        if (showForm !== 'DELETE'){
            toggleShowForm('DELETE');
        } else {
            toggleShowForm(null);
        }
    }


    return (
        <div>
            { diveSites.map(site => (
                <Marker 
                key={site._id}
                position={{
                    lat: parseFloat(site.latitude),
                    lng: parseFloat(site.longitude)
                }}
                onClick={() =>{
                    setSelectedSite(site);
                }}
                icon={{
                   url: site.siteType === "1" ? shoreIcon : boatIcon,
                   scaledSize: new window.google.maps.Size(60, 60)
                }}
                />
            ))}

            {selectedSite && ( /* OVERLAYVIEW is needed here for custom CSS and window properties*/
                <InfoWindow
                    position={{
                        lat: parseFloat(selectedSite.latitude),
                        lng: parseFloat(selectedSite.longitude)
                    }}
                    onCloseClick={() => {
                        toggleShowForm(null);
                        setSelectedSite(null);
                    } }
                >

                        <div className={classes.buttonsContainer}>
                            <button onClick = {editSiteHandler}>Edit</button>
                            <button onClick = {showDeleteForm}>Delete</button>
                        </div>
                   
                </InfoWindow>
            )}
            
        </div>
    );
};

export default MySitesMap;



/// 