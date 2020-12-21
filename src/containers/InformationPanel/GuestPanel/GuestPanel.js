import React, { useState, useContext, useEffect} from 'react';

import { useHistory } from "react-router-dom";

import Spinner from '../../../components/Spinner/Spinner';


import { DiveSitesContext,
         DetailsContext,
         SiteContext,
         DiveShopsContext,
         ShopContext,
         GeoAreaContext } from '../../../context/DiveSiteContext';

import {AuthContext, LocationNameContext, GlobalLoaderContext} from '../../../context/AuthContext';
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

    const [globalLoader, setGlobalLoader] = useContext(GlobalLoaderContext);

    const [geoArea, setGeoArea] = useContext(GeoAreaContext);


    useEffect(() => {    
        if (diveSites.length >= 1) {
            setList("DiveSites");
        } else if (diveShops.length >= 1) {
            setList("DiveShops");
        } else {
            setList(null);
        }
    },[diveSites, diveShops]);


    //console.log('[GuestPanel] locationName = ' + locationName);
    return (
        <div className={classes.guestPanel}>
            <div className={classes.topSection}>
                <p className={classes.topSection__totalSites}>
                    {diveSites.length} sites  · {locationName ? locationName : null} 
                    {!locationName && !globalLoader.diveshops && !globalLoader.divesites ? geoArea.area + " · " + geoArea.state : null}
                </p>
                <h3 className={classes.topSection__mapAreaText}>
                    Dive sites {locationName ? locationName : null} 
                    {!locationName && !globalLoader.diveshops && !globalLoader.divesites ? "near " + geoArea.area + ", " + geoArea.state : null}
                </h3>
                <span className={`${classes.topSection__link} ${list == "DiveSites" ? classes.topSection__linkActive : null}`} onClick={() => setList('DiveSites')}>({diveSites.length}) Dive Sites</span>
                <span className={classes.topSection__seeLinkSpacer}>·</span>
                <span className={`${classes.topSection__link} ${list == "DiveShops" ? classes.topSection__linkActive : null}`} onClick={() => setList('DiveShops')}>({diveShops.length}) See Dive Shops</span>
            </div>

            {/* <ToggleButtons/> */}
            {!globalLoader.divesites && (
                <div>
                    {list == 'DiveSites' && (
                    <div>
                        {diveSites.map(site => (
                            <DivesiteListingPanel site={site}/>
                            
                    ))}
                    </div>
                    )}
                </div>
            )}
            {!globalLoader.diveshops && (
                <div>
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
            )}
                
                
            

            {globalLoader.divesites && globalLoader.diveshops && (
                <div className={classes.loadingContainer}>
                <p className={classes.loadingContainer__text}>Searching...</p>
                <Spinner/>
                </div>
            )}


        </div>
    );
};

export default GuestPanel;