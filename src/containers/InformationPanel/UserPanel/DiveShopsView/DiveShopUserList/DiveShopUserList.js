import React, {useContext} from 'react';

import classes from './DiveShopUserList.module.scss';

import { DiveShopsContext, ShopContext } from '../../../../../context/DiveSiteContext';
import { AccountContext } from '../../../../../context/AuthContext';
import { EditDiveShopModalContext } from '../../../../../context/UserContext';

import {ReactComponent as EditSVG} from '../../../../../assets/icons/edit.svg';
import {ReactComponent as PhoneSVG} from '../../../../../assets/icons/phone.svg';
import {ReactComponent as EmailSVG} from '../../../../../assets/icons/email.svg';
import {ReactComponent as LocationSVG} from '../../../../../assets/icons/location-marker.svg';
import {ReactComponent as WebsiteSVG} from '../../../../../assets/icons/global.svg';
import {ReactComponent as FacebookSVG} from '../../../../../assets/icons/facebook.svg';
import {ReactComponent as InstagramSVG} from '../../../../../assets/icons/instagram.svg';
import {ReactComponent as TwitterSVG} from '../../../../../assets/icons/twitter.svg';


import DiveshopListingPanel from '../../../../../components/Diveshop/DiveshopListingPanel/DiveshopListingPanel';

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
                <DiveshopListingPanel shop={shop} edit={true}/>
            ))}
        </div>
            

    );
};

export default DiveShopUserList;