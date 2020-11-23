import React, {useContext} from 'react';

import classes from './DiveShopUserList.module.scss';

import { DiveShopsContext, ShopContext } from '../../../context/DiveSiteContext';
import { AccountContext } from '../../../context/AuthContext';
import { EditDiveShopModalContext } from '../../../context/UserContext';

import {ReactComponent as EditSVG} from '../../../assets/icons/edit.svg';
import {ReactComponent as PhoneSVG} from '../../../assets/icons/phone.svg';
import {ReactComponent as EmailSVG} from '../../../assets/icons/email.svg';
import {ReactComponent as LocationSVG} from '../../../assets/icons/location-marker.svg';
import {ReactComponent as WebsiteSVG} from '../../../assets/icons/global.svg';
import {ReactComponent as FacebookSVG} from '../../../assets/icons/facebook.svg';
import {ReactComponent as InstagramSVG} from '../../../assets/icons/instagram.svg';
import {ReactComponent as TwitterSVG} from '../../../assets/icons/twitter.svg';

const DiveShopUserList = () => {

    const [ diveShops, setDiveShops ] = useContext(DiveShopsContext);
    const [ account, setAccount ] = useContext(AccountContext);
    const [ selectedShop, setSelectedShop ] = useContext(ShopContext);

    const [editDiveShopModal, setEditDiveShopModal] = useContext(EditDiveShopModalContext);





    console.log(diveShops);
    console.log(account);

    return (
        <div className={classes.diveShopUserList}>
            <div className={classes.diveShopUserList__titleContainer}>
                <h3 className={classes.header}> {account.username}'s Added Shops  ·   {diveShops.length} shops in the area</h3>
            </div>
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
                            setEditDiveShopModal(true);
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
            

    );
};

export default DiveShopUserList;