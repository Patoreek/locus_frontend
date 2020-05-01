
import React, { useState, useEffect, useContext } from 'react';

import {
    Marker,
    InfoWindow
} from 'react-google-maps';


import { FormContext } from '../../../context/AdminContext';
import { DiveSitesContext,
         SiteContext,
         CoordsContext } from '../../../context/DiveSiteContext';



import shoreIcon from '../../../images/locationIcons/ShoreLocation.svg';
import boatIcon from '../../../images/locationIcons/BoatLocation.svg';

import shoreIconCircle from '../../../images/locationIcons/shoreIconCircle.png';
import boatIconCircle from '../../../images/locationIcons/boatIconCircle.png';

import classes from './AdminMap.module.css';

const AdminMap = () => {

    const [ showForm, toggleShowForm ] = useContext(FormContext);
    const [selectedSite, setSelectedSite] = useContext(SiteContext);
    const [diveSites, setDiveSites] = useContext(DiveSitesContext);
    const [coords, setCoords] = useContext(CoordsContext);





    useEffect(() => {
        async function loadDiveSites() {
            // You can await here
        const response = await fetch('http://localhost:8080/diveSites/getSites',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        const sites = data.site;
        setDiveSites(sites);
            // ...
        }
        loadDiveSites();
    }, [diveSites]);

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

export default AdminMap;



/// 