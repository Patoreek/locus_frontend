
import React, { useState, useEffect, useContext } from 'react';

import {
    Marker,
    InfoWindow
} from 'react-google-maps';

import { DetailsContext } from '../../../context/GuestContext';

import { AuthContext } from '../../../context/AuthContext';

import { DiveSitesContext,
         SiteContext } from '../../../context/DiveSiteContext';

import shoreIcon from '../../../images/locationIcons/ShoreLocation.svg';
import boatIcon from '../../../images/locationIcons/BoatLocation.svg';

import shoreIconCircle from '../../../images/locationIcons/shoreIconCircle.png';
import boatIconCircle from '../../../images/locationIcons/boatIconCircle.png';

import classes from './GuestMap.module.css';

const GuestMap = () => {

    const [selectedSite, setSelectedSite] = useContext(SiteContext);

    const [diveSites, setDiveSites] = useContext(DiveSitesContext);

    //const [moreDetails, setMoreDetails] = useContext(DetailsContext);

    //const [isAuth, setIsAuth] = useContext(AuthContext);


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

    const moreDetailsClicked = () => {

        // if (!moreDetails){
        //     setMoreDetails(true);
        // } else {
        //     setMoreDetails(false);
        // }

        // if (props.moreDetails.pressed) {
        //     props.setMoreDetails({
        //         pressed: false,
        //         siteId: selectedSite._id
        //     })
        // } else {
        //     props.setMoreDetails({
        //         pressed: true,
        //         siteId: selectedSite._id
        //     })
        // }

        // console.log('More Detailed Clicked Function Works');
        // console.log(moreDetails);
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
                        setSelectedSite(null);
                    } }
                >
                    <div className={classes.infowindowContainer}>
                        <div className={classes.nameContainer}>
                            <div className={classes.siteTypeContainer}>
                                <img className={classes.Icon}
                                     src={selectedSite.siteType === "Shore" ? shoreIconCircle : boatIconCircle}/>
                            </div>
                            <h2>{selectedSite.name}, {selectedSite.area}</h2>
                        </div>
                        <div className={classes.mediaContainer}>
                            <div className={classes.picturesContainer}>
                                <h3>Picture</h3>
                            </div>
                            <div className={classes.videosContainer}>
                                <h3>Videos</h3>
                            </div>
                            <div className={classes.buttonMediaContainer}>
                                <button>Pictures</button>
                                <button>Videos</button>
                            </div>
                        </div>
                        <div className={classes.detailsContainer}>
                            <h3 className = {classes.moreDetailsLink}
                                onClick = {moreDetailsClicked}>more details</h3>
                        </div>
                        <div className={classes.reviewContainer}>
                            <h3>review stars</h3>
                        </div>
                        {/* isAuth && ( */ }
                                <div className={classes.buttonsContainer}>
                                <button>Favourite</button>
                                <button>Report</button>
                            </div>
                        {/* })} */}
     
                   
                    </div>
                </InfoWindow>
            )}
            
        </div>
    );
};

export default GuestMap;



/// 