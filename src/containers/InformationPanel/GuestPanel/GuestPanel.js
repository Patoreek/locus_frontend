import React, { useState, useContext, useEffect} from 'react';

import { useHistory } from "react-router-dom";


import { DiveSitesContext,
         DetailsContext,
         SiteContext,
         DiveShopsContext,
         ShopContext } from '../../../context/DiveSiteContext';

import {AuthContext, LocationNameContext} from '../../../context/AuthContext';
import ToggleButtons from '../ToggleButtons/ToggleButtons';


import DivesiteListingPanel from '../../../components/Divesite/DivesiteListingPanel/DivesiteListingPanel';
import DiveshopListingPanel from '../../../components/Diveshop/DiveshopListingPanel/DiveshopListingPanel';

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
                <span onClick={() => setList('DiveSites')}>See Dive Sites</span><span className={classes.seeLinkSpacer}>·</span>
                <span onClick={() => setList('DiveShops')}>See Dive Shops</span>
            </div>

            {/* <ToggleButtons/> */}
        {list == 'DiveSites' && (
        <div>
            {diveSites.map(site => (
                <DivesiteListingPanel site={site}/>
                
           ))}
        </div>
        )}

        {list == 'DiveShops' && (
        <div>
            {diveShops.map(shop => (

                <DiveshopListingPanel shop={shop}/>

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