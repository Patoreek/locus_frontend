import React, { useState, useContext, useEffect} from 'react';

import { useHistory } from "react-router-dom";


import { DiveSitesContext,
         DetailsContext,
         SiteContext,
         DiveShopsContext,
         ShopContext } from '../../../context/DiveSiteContext';

import {AuthContext, LocationNameContext} from '../../../context/AuthContext';

import StarRating from '../../../components/StarRating/StarRating';
import FavouriteButton from '../../../components/Buttons/FavouriteButton/FavouriteButton';
import EllipsesButton from '../../../components/Buttons/EllipsesButton/EllipsesButton';
import ToggleButtons from '../ToggleButtons/ToggleButtons';

import {ReactComponent as EditSVG} from '../../../assets/icons/edit.svg';
import {ReactComponent as PhoneSVG} from '../../../assets/icons/phone.svg';
import {ReactComponent as EmailSVG} from '../../../assets/icons/email.svg';
import {ReactComponent as LocationSVG} from '../../../assets/icons/location-marker.svg';
import {ReactComponent as WebsiteSVG} from '../../../assets/icons/global.svg';
import {ReactComponent as FacebookSVG} from '../../../assets/icons/facebook.svg';
import {ReactComponent as InstagramSVG} from '../../../assets/icons/instagram.svg';
import {ReactComponent as TwitterSVG} from '../../../assets/icons/twitter.svg';



import classes from './GuestPanel.module.scss';

const GuestPanel = () => {

    let history = useHistory();

    const [diveSites, setDiveSites] = useContext(DiveSitesContext);

    const [diveShops, setDiveShops] = useContext(DiveShopsContext);

    const [moreDetails, setMoreDetails] = useContext(DetailsContext);

    const [selectedSite, setSelectedSite] = useContext(SiteContext);

    const [selectedShop, setSelectedShop] = useContext(ShopContext);

    const [locationName, setLocationName] = useContext(LocationNameContext);

    const [isAuth, setIsAuth] = useContext(AuthContext);

    const [list, setList] = useState("DiveSites");


    useEffect(() => {    
        if (diveSites.length >= 1) {
            setList("DiveSites");
        } else if (diveShops.length >= 1) {
            setList("DiveShops");
        } else {
            setList(null);
        }
    },[diveSites, diveShops]);


    console.log('[GuestPanel] locationName = ' + locationName);
    return (
        <div className={classes.guestPanel}>
            <div className={classes.topSection}>
                <p>{diveSites.length} sites  · {locationName ? locationName : 'In current view'} </p>
                <h3>Dive sites in selected map area</h3>
                <span onClick={() => setList('DiveSites')}>See Dive Sites</span>
                <span onClick={() => setList('DiveShops')}>See Dive Shops</span>
            </div>

            {/* <ToggleButtons/> */}
        {list == 'DiveSites' && (
        <div>
            {diveSites.map(site => (
                <div className={classes.site}>
                    <div className={classes.site__imageContainer}>
                        <a href={"/divesite/" + site._id}>
                            <img src={'http://localhost:8080/' + site.images[0]}
                                className={classes.image}
                            />
                        </a>
                    </div>

                    <div className={classes.site__diveTypeContainer}>
                        <span> {site.siteType} Dive · {site.suitable}</span> 
                    </div>


                    <div className={classes.site__nameContainer}>
                        <h5  className={classes.siteName}>
                            <a href={"/divesite/" + site._id}>
                                {site.name}, {site.area}
                            </a>
                        </h5>
                    </div>

                    {isAuth && (
                        <div className={classes.site__favButtonContainer}>
                            <FavouriteButton site={site}/> 
                        </div>
                    )}

                

                    <div className={classes.site__descriptionContainer}>
                        <p className={classes.siteDescription}> {site.description} </p>
                    </div>

                    <div className={classes.site__ratingsContainer}>
                        <StarRating site={site}/>
                    </div>

                    <div className={classes.site__moreDetailsContainer}>
                                <a href={"/divesite/" + site._id} className={classes.moreDetailsButton}>
                                        More Details...
                                    </a>
                    </div>
                
                </div>
            ))}
        </div>
        )}

        {list == 'DiveShops' && (
        <div>
            {diveShops.map(shop => (

                <div className={classes.shop}>
                    <div className={classes.shop__imageContainer}>
                        <a href={"/diveshop/" + shop._id}>
                        <img src={'http://localhost:8080/' + shop.logo}
                            className={classes.image}
                        />
                        </a>
                    </div>

                    <div className={classes.shop__nameContainer}>
                        <h5  className={classes.shopName}>
                            <a href={"/diveshop/" + shop._id}>
                                {shop.name}
                            </a>
                        </h5>
                    </div>

                    <div className={classes.shop__editContainer}>
                        <EditSVG className={classes.edit} onClick={() => {
                            setSelectedShop(shop);
                        }}/>
                    </div>

                    <div className={classes.shop__addressContainer}>
                            <LocationSVG className={`${classes.icon} ${classes.icon__location}`}/>
                            <a  href={"https://www.google.com/search?q=" + shop.address}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={classes.address}>
                                    {shop.address}
                            </a>
                    </div>

                    <div className={classes.shop__phoneContainer}>
                            <PhoneSVG className={`${classes.icon} ${classes.icon__phone}`}/>
                            <a  href={"tel:" + shop.phone}
                                className={classes.phone}>
                                    {shop.phone}
                            </a>
                    </div>


                    <div className={classes.shop__emailContainer}>
                            <EmailSVG className={`${classes.icon} ${classes.icon__email}`}/>
                            <a  href={"mailto:" + shop.email}
                                className={classes.email}>
                                    {shop.email}
                            </a>
                    </div>

                    <div className={classes.shop__websiteContainer}>
                    <WebsiteSVG className={`${classes.icon} ${classes.icon__website}`}/>

                            <a  href={shop.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={classes.website}>
                                    {shop.website}
                            </a>
                    </div>

                    <div className={classes.socialsContainer}>
                                <div className={classes.socialsContainer__facebookContainer}>
                                    <a  href={shop.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                        <FacebookSVG className={`${classes.icon} ${classes.icon__facebook}`}/>
                                    </a>
                                </div>
                                <div className={classes.socialsContainer__instagramContainer}>
                                    <a  href={shop.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                        <InstagramSVG className={`${classes.icon} ${classes.icon__instagram}`}/>
                                    </a>
                                </div>
                                <div className={classes.socialsContainer__twitterContainer}>
                                    <a  href={shop.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                        <TwitterSVG className={`${classes.icon} ${classes.icon__twitter}`}/>
                                    </a>
                                </div>
                            </div>
                    
                
                </div>

            ))}
        </div>
        )}

        {list == null && (
            <div className={classes.noResults}> 
                <h1>There are no Dive Sites or Dive Shops in this area.</h1>
            </div>
        )}

        </div>
    );
};

export default GuestPanel;