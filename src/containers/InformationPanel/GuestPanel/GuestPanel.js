import React, { useState, useContext, useEffect} from 'react';

import { useHistory } from "react-router-dom";

import Spinner from '../../../components/Spinner/Spinner';
import { SpinnerCircular } from 'spinners-react';


import InfiniteScroll from 'react-infinite-scroll-component';



import { DiveSitesContext,
         DetailsContext,
         SiteContext,
         DiveShopsContext,
         ShopContext,
         GeoAreaContext,
         ScubaFilterContext,
         SnorkelFilterContext,
         PanelDiveSitesContext,
         LoadDiveSitesInBoundsInfiniteContext,
         ScrollCounterContext,
         HasMoreDataContext } from '../../../context/DiveSiteContext';

import {AuthContext, LocationNameContext, GlobalLoaderContext, MapRefContext} from '../../../context/AuthContext';
import ToggleButtons from '../ToggleButtons/ToggleButtons';


import DivesiteListingPanel from '../../../components/Divesite/DivesiteListingPanel/DivesiteListingPanel';

import DiveshopListingPanel from '../../../components/Diveshop/DiveshopListingPanel/DiveshopListingPanel';

import { ReactComponent as OrangeMarkerSVG } from '../../../assets/icons/location_orange.svg';
import { ReactComponent as BlueMarkerSVG } from '../../../assets/icons/location_blue.svg';

import classes from './GuestPanel.module.scss';
import { callbackPromise } from 'nodemailer/lib/shared';

const GuestPanel = () => {

    let history = useHistory();

    const [diveSites, setDiveSites] = useContext(DiveSitesContext);

    const [panelDiveSites, setPanelDiveSites] = useContext(PanelDiveSitesContext);

    const [diveShops, setDiveShops] = useContext(DiveShopsContext);

    const [moreDetails, setMoreDetails] = useContext(DetailsContext);

    const [selectedSite, setSelectedSite] = useContext(SiteContext);

    const [selectedShop, setSelectedShop] = useContext(ShopContext);

    const [locationName, setLocationName] = useContext(LocationNameContext);

    const [isAuth, setIsAuth] = useContext(AuthContext);

    const [list, setList] = useState("DiveSites");

    const [globalLoader, setGlobalLoader] = useContext(GlobalLoaderContext);

    const [geoArea, setGeoArea] = useContext(GeoAreaContext);

    const [scubaFilter, setScubaFilter] = useContext(ScubaFilterContext);
    const [snorkelFilter, setSnorkelFilter] = useContext(SnorkelFilterContext);

    const mapRef = useContext(MapRefContext);

    const loadDiveSitesInBoundsInfinite = useContext(LoadDiveSitesInBoundsInfiniteContext);

    const [scrollCounter, setScrollCounter] = useContext(ScrollCounterContext);

    const [hasMoreData, setHasMoreData] = useContext(HasMoreDataContext);



    useEffect(() => {
        fetchData();

        return () => {
            setScrollCounter(0);
        }
    }, [])

    useEffect(() => {
        console.log(panelDiveSites);
    }, [panelDiveSites])


    useEffect(() => {    
        if (diveSites.length >= 1) {
            setList("DiveSites");
        } else if (diveShops.length >= 1) {
            setList("DiveShops");
        } else {
            setList(null);
        }
    },[diveSites, diveShops]);

    let timer;

    const fetchData = () => {

        clearTimeout(timer);
        timer = setTimeout(function() {
        console.log("handleBoundsChanged")
        const lat = mapRef.current.getCenter().lat()
        const lng = mapRef.current.getCenter().lng()
      
        const mapBounds = mapRef.current.getBounds();
           
        loadDiveSitesInBoundsInfinite(mapBounds, scrollCounter);


            //loadDiveShopsInBoundsInfinite(mapBounds, setGlobalLoader);
        }, 1000);
    }


    //console.log('[GuestPanel] locationName = ' + locationName);
    return (
        <div className={classes.guestPanel}>
            <div className={classes.topSection}>
                <div className={classes.topSection__legend}>
                    
                        <span>Dive Site</span>
                        <BlueMarkerSVG className={classes.marker}/>
                        <span>Dive Shop</span>
                        <OrangeMarkerSVG className={classes.marker}/>
                   
                </div>
                <p className={classes.topSection__totalSites}>
                    {diveSites ? diveSites.length : "0"} sites  · {locationName ? locationName : null} 
                    {!locationName && !globalLoader.diveshops && !globalLoader.divesites ? geoArea.area + " · " + geoArea.state : null}
                </p>
                <h3 className={classes.topSection__mapAreaText}>
                    Dive sites {locationName ? locationName : null} 
                    {!locationName && !globalLoader.diveshops && !globalLoader.divesites ? "near " + geoArea.area + ", " + geoArea.state : null}
                </h3>
                <span className={`${classes.topSection__link} ${list == "DiveSites" ? classes.topSection__linkActive : null}`} onClick={() => setList('DiveSites')}>({diveSites.length}) Dive Sites</span>
                <span className={classes.topSection__seeLinkSpacer}>·</span>
                <span className={`${classes.topSection__link} ${list == "DiveShops" ? classes.topSection__linkActive : null}`} onClick={() => setList('DiveShops')}>({diveShops.length}) See Dive Shops</span>

                <div className={classes.topSection__filter}>
                    <div className={classes.scubaFilter}>
                        <input  type="checkbox"
                                checked={scubaFilter}
                                onChange={() => setScubaFilter(!scubaFilter)}
                                className={classes.scubaFilter__checkbox}/>
                        <span className={classes.scubaFilter__label}> Scuba </span>
                    </div>
                    <div className={classes.snorkelFilter}>
                        <input  type="checkbox" 
                                checked={snorkelFilter}
                                onChange={() => setSnorkelFilter(!snorkelFilter)}
                                className={classes.snorkelFilter__checkbox}/>
                        <span className={classes.snorkelFilter__label}> Snorkel </span>
                    </div>
                </div>
            </div>

            {/* <ToggleButtons/> */}
            {!globalLoader.divesites && (
                <div className={classes.listings}>
                    {list == 'DiveSites' && (
                        <div>
                           <InfiniteScroll
                                dataLength={panelDiveSites.length}
                                next={() => fetchData()}
                                hasMore={hasMoreData}
                                endMessage={
                                    <div className={classes.loadingData}>
                                        <p className={classes.loadingData__end}>No more Dive Sites in this area</p>
                                    </div>
                                  }
                                loader={
                                    <div className={classes.loadingData}>
                                        {/* <p>Loading more Dive Sites...</p> */}
                                        <SpinnerCircular size={40} color={'#1263fa'}/>
                                    </div>
                                }
                                
                           >
                                {panelDiveSites.map(site => (
                                    <DivesiteListingPanel site={site}/>
                                    
                                ))}
                            </InfiniteScroll>
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