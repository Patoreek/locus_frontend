import React, {useState, useContext, useEffect} from 'react';

import classes from './DiveshopListingPanel.module.scss';

import { AuthContext } from '../../../context/AuthContext';

import {ReactComponent as EditSVG} from '../../../assets/icons/edit.svg';
import {ReactComponent as PhoneSVG} from '../../../assets/icons/phone.svg';
import {ReactComponent as EmailSVG} from '../../../assets/icons/email.svg';
import {ReactComponent as LocationSVG} from '../../../assets/icons/location_default.svg';
import {ReactComponent as WebsiteSVG} from '../../../assets/icons/global.svg';
import {ReactComponent as FacebookSVG} from '../../../assets/icons/facebook.svg';
import {ReactComponent as InstagramSVG} from '../../../assets/icons/instagram.svg';
import {ReactComponent as TwitterSVG} from '../../../assets/icons/twitter.svg';

import { ShopContext } from '../../../context/DiveSiteContext';

const DivesiteListingPanel = (props) => {

    const [isAuth, setIsAuth] = useContext(AuthContext);
    const [selectedShop, setSelectedShop] = useContext(ShopContext);

    const [edit, setEdit] = useState(false);

    const shop = props.shop;
    
    useEffect(() => {
        if (props.edit){
            setEdit(props.edit);
        } else {
            setEdit(false);
        }
    }, [])

    return (
        <div className={classes.shop}>
        <a href={"/diveshop/" + shop._id} className={classes.shop__link} target="_blank" rel="noopener noreferrer"></a>
        <div className={classes.shop__imageContainer}>
            <a href={"/diveshop/" + shop._id} target="_blank" rel="noopener noreferrer">
            <img src={'http://localhost:8080/' + shop.logo}
                className={classes.image}
            />
            </a>
        </div>

        <div className={classes.shop__nameContainer}>
            <h5 className={classes.shopName}>
                <a href={"/diveshop/" + shop._id} target="_blank" rel="noopener noreferrer">
                    {shop.name}
                </a>
            </h5>
        </div>

        {edit && (
            <div className={classes.shop__editContainer}>
                <EditSVG className={classes.edit} onClick={() => {
                    props.setEditDiveShopModal(true);
                    setSelectedShop(shop);
                }}/>
            </div>
        )}

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

        {/* <div className={classes.socialsContainer}>
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
                </div> */}
        
    
    </div>

    );
};

export default DivesiteListingPanel;