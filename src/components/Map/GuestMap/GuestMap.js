
import React, { useState, useEffect, useContext } from 'react';

import { Link } from 'react-router-dom';

import {Popover, OverlayTrigger, Button} from 'react-bootstrap';

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
import PhotoContainer from './PhotosContainer/PhotoContainer';
import ReviewStars from '../../ReviewStars/ReviewStars';

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
            <Button onClick={addToFavourite}>Favourite</Button>
        );
    } else {

        favouriteButton = (
            <Button onClick={() => removeFromFavourite(selectedSite)}>UnFavourite</Button>
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

    const popover = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Popover right</Popover.Title>
          <Popover.Content>
           <Button> Share </Button>
           <Button> Report </Button>
          </Popover.Content>
        </Popover>
      );

    

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
                            <PhotoContainer selectedSite={selectedSite}/>
                        </div>
                        
                        <div className={classes.detailsContainer}>
                            <Button variant="link" onClick={detailsHandler}>More Details</Button>
                        </div>
                        <div className={classes.reviewContainer}>
                            <ReviewStars/>
                        </div>
                        {isAuth && (
                            <div className={classes.buttonsContainer}>
                                {favouriteButton}
                                <Button onClick={commentHandler}>Comment</Button>
                                <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                                    <Button variant="info">...</Button>
                                </OverlayTrigger>
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