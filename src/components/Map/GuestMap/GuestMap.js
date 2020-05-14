
import React, { useState, useEffect, useContext } from 'react';

import { Link } from 'react-router-dom';

import {
    Marker,
    InfoWindow
} from 'react-google-maps';

import { AuthContext,
         AccountContext,
         FavButtonContext,
         RemoveFavContext } from '../../../context/AuthContext';

import { DiveSitesContext,
         SiteContext,
         LoadDiveSiteContext,
         DetailsContext } from '../../../context/DiveSiteContext';

import shoreIcon from '../../../images/locationIcons/ShoreLocation.svg';
import boatIcon from '../../../images/locationIcons/BoatLocation.svg';

import shoreIconCircle from '../../../images/locationIcons/shoreIconCircle.png';
import boatIconCircle from '../../../images/locationIcons/boatIconCircle.png';

import WeatherContainer from '../../../containers/WeatherContainer/WeatherContainer';

import classes from './GuestMap.module.css';

const GuestMap = () => {

    const [selectedSite, setSelectedSite] = useContext(SiteContext);

    const [moreDetails, setMoreDetails] = useContext(DetailsContext);

    const [diveSites, setDiveSites] = useContext(DiveSitesContext);

    //const [moreDetails, setMoreDetails] = useContext(DetailsContext);

    const [isAuth, setIsAuth] = useContext(AuthContext);
    const [account, setAccount] = useContext(AccountContext);

    // const [favButton, setFavButton] = useState(true);
    const [favButton, setFavButton] = useContext(FavButtonContext);

    const loadDiveSites = useContext(LoadDiveSiteContext);

    const removeFromFavourite = useContext(RemoveFavContext);




    useEffect(() => {
       
        loadDiveSites();
        
    }, [diveSites]);

    let favouriteButton;
    if (favButton) {

        favouriteButton = (
            <button onClick={addToFavourite}>Favourite</button>
        );
    } else {

        favouriteButton = (
            <button onClick={() => removeFromFavourite(selectedSite)}>UnFavourite</button>
        );
    }
    useEffect(() => {
        checkUserRelation();
    },[selectedSite]);
    

    async function checkUserRelation(){
        if (selectedSite !== null){
            console.log('Checking uSer Relation');
            //console.log(selectedSite);
            const response = await fetch('http://localhost:8080/user/checkFavourites',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    selectedSiteId: selectedSite._id
                })
            });
            const data = await response.json();
            console.log('RESPONSE FROM API');
            console.log(data.message);
            const isFav = data.isFav;
            
            if (isFav){
                setFavButton(false);
            } else {
                setFavButton(true);
            }
            
        }
    }


    

    async function addToFavourite() {
        console.log('Adding to favourite');
        // SELECTEDSITE ID PUT INTO FAVOURITE SITES ID FOR THAT USER
        console.log(selectedSite._id);
        const response = await fetch('http://localhost:8080/user/addToFavourite',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                selectedSiteId: selectedSite._id,
                userId: account.id
            })
        });
        const data = await response.json();

        console.log(data.message);
        setFavButton(false);
        //const sites = data;
 
          
    }

    const detailsHandler = () => {
        setMoreDetails(true);
    }

    const commentHandler = () => {
        console.log('Commenting on Site');
        
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
                                {selectedSite.images.map(image => (
                                    <div className={classes.siteImages}>
                                    <img src = {'http://localhost:8080/' + image} className={classes.siteImage}/>
                                    </div>
                                ))}
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
                            <button onClick={detailsHandler}>More Details</button>
                        </div>
                        <div className={classes.reviewContainer}>
                            <h3>review stars</h3>
                        </div>
                        {isAuth && (
                            <div className={classes.buttonsContainer}>
                                {favouriteButton}
                                <button onClick={commentHandler}>Comment</button>
                                <button>...</button> {/* Share and report buttons*/}
                            </div>
                        )} 
     
                   
                    </div>
                </InfoWindow>
            )}
            
        </div>
    );
};

export default GuestMap;



/// 