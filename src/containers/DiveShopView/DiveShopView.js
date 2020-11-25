import React, { useState, useEffect } from 'react';

import classes from './DiveShopView.module.scss';


import {ReactComponent as PhoneSVG} from '../../assets/icons/phone.svg';
import {ReactComponent as EmailSVG} from '../../assets/icons/email.svg';
import {ReactComponent as LocationSVG} from '../../assets/icons/location-marker.svg';
import {ReactComponent as WebsiteSVG} from '../../assets/icons/global.svg';
import {ReactComponent as FacebookSVG} from '../../assets/icons/facebook.svg';
import {ReactComponent as InstagramSVG} from '../../assets/icons/instagram.svg';
import {ReactComponent as TwitterSVG} from '../../assets/icons/twitter.svg';

const DiveShopView = (props) => {

    const shopId = props.match.params.id;

    //TODO: ADD STATE, SET STATE FROM API, RENDER TO DOM
    const [name, setName] = useState();
    const [area, setArea] = useState();
    const [country, setCountry] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    const [website, setWebsite] = useState();
    const [facebook, setFacebook] = useState();
    const [twitter, setTwitter] = useState();
    const [instagram, setInstagram] = useState();
    const [logo, setLogo] = useState();
    const [banner, setBanner] = useState();
    const [diveSites, setDiveSites] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    //? associated dive sites
    //? trading hours


    useEffect(() => {

        async function getShop() {

            try {
              const response = await fetch('http://localhost:8080/diveShops/findShop/' + shopId,{
                method: 'GET',
                credentials: 'include',
              });
              const results = await response.json();
              console.log(results);
            //   const site = results.site;
  
              const shop = results.shop;
              
              setName(shop.name);
              setArea(shop.area);
              setCountry(shop.country);
              setPhone(shop.phone);
              setEmail(shop.email);
              setAddress(shop.address);
              setWebsite(shop.website);
              setFacebook(shop.facebook);
              setTwitter(shop.twitter);
              setInstagram(shop.instagram);
              setLogo(shop.logo);
              setBanner(shop.banner);
              setDiveSites(shop.associatedDiveSites);
              setIsLoading(false);
      
            } catch (error) {
             console.log(error);
             //setIsLoading(true);
            }
          }
          
          getShop();

    }, []);

    

    return (
        <div className={classes.diveShop}>
                <div className={classes.banner}>
                    <img src={"http://localhost:8080/" + banner} width="550px" height="250px" />
                </div>
                <div className={classes.mainGrid}>
                    <div className={classes.mainGrid__topContainer}>
                        <div className={classes.imageContainer}>
                            <img src={"http://localhost:8080/" + logo}/>
                        </div>
                        <div className={classes.shopInfo}>
                            <div className={classes.nameContainer}>
                                <h2>{name}</h2>
                            </div>
                            <div className={classes.addressContainer}>
                                <LocationSVG className={`${classes.icon} ${classes.icon__location}`}/>
                                <a href={"https://www.google.com/search?q=" + address}
                                target="_blank"
                                rel="noopener noreferrer">{address}</a>
                            </div>
                            <div className={classes.websiteContainer}>
                                <WebsiteSVG className={`${classes.icon} ${classes.icon__website}`}/>
                                <a href={website}
                                target="_blank"
                                rel="noopener noreferrer">{website}</a>
                            </div>
                        </div>

                    </div>
                    <div className={classes.mainGrid__bottomContainer}>
                        <div className={classes.leftGrid}>
                            <div className={classes.leftGrid__diveSites}>
                                    <h3> Sites that {name} dive at</h3>
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
                                        

                                            <div className={classes.site__descriptionContainer}>
                                                <p className={classes.siteDescription}> {site.description} </p>
                                            </div>

                                            <div className={classes.site__ratingsContainer}>
                                                {/* <StarRating site={site}/> */}
                                            </div>

                                            <div className={classes.site__moreDetailsContainer}>
                                                        <a href={"/divesite/" + site._id} className={classes.moreDetailsButton}>
                                                                More Details...
                                                            </a>
                                            </div>
                                        
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className={classes.rightGrid}>
                            <div className={classes.rightGrid__contactInfo}>
                                <div className={classes.titleContainer}>
                                    <h5>Contact Information</h5>
                                </div>
                                <div className={classes.phoneContainer}>
                                    <PhoneSVG className={`${classes.icon} ${classes.icon__phone}`}/>
                                    <a href={"tel:" + phone}>{phone}</a>
                                </div>
                                <div className={classes.emailContainer}>
                                    <EmailSVG className={`${classes.icon} ${classes.icon__email}`}/>
                                    <a href={"mailto:" + email}>{email}</a>
                                </div>
                                <div className={classes.socialsContainer}>
                                <div className={classes.socialsContainer__facebookContainer}>
                                    <a  href={facebook}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                        <FacebookSVG className={`${classes.icon} ${classes.icon__facebook}`}/>
                                    </a>
                                </div>
                                <div className={classes.socialsContainer__instagramContainer}>
                                    <a  href={instagram}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                        <InstagramSVG className={`${classes.icon} ${classes.icon__instagram}`}/>
                                    </a>
                                </div>
                                <div className={classes.socialsContainer__twitterContainer}>
                                    <a  href={twitter}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                        <TwitterSVG className={`${classes.icon} ${classes.icon__twitter}`}/>
                                    </a>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>

                </div>
               
              
                

        </div>
    );
};

export default DiveShopView;