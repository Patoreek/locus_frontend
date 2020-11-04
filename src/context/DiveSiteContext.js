import React, { useState, createContext } from 'react';

export const SiteContext = createContext();
export const DiveSitesContext = createContext();
export const CoordsContext = createContext();
export const LoadDiveSiteContext = createContext();
export const DetailsContext = createContext();
export const LoadDiveSiteInBoundsContext = createContext();

export const DiveShopsContext = createContext();
export const LoadDiveShopsInBoundsContext = createContext();
export const ShopContext = createContext();











export const DiveSiteProvider = (props) => {

    
    const [ selectedSite, setSelectedSite ] = useState(null);

    const [moreDetails, setMoreDetails] = useState(false);

    const [diveSites, setDiveSites] = useState([]);

    const [diveShops, setDiveShops] = useState([]);

    const [ selectedShop, setSelectedShop ] = useState(null);


    const [coords, setCoords] = useState({
        lat: '',
        lng: ''
    });

    const [locationName, setLocationName] = useState("");

    async function loadDiveSites() {
            // You can await here
        console.log('IN LOAD DIVE SITE');
        const response = await fetch('http://localhost:8080/diveSites/getSites',{
            method: 'GET'
        });
        const data = await response.json();
        const sites = data.site;
        setDiveSites(sites);
        return true;
            // ...
    }

    async function loadDiveSitesInBounds(mapBounds) {
        // You can await here
        console.log('loadDiveSitesInBounds');
        console.log(mapBounds);
        const swLat = mapBounds.Ya.i;
        const swLng = mapBounds.Sa.i;
        const neLat = mapBounds.Ya.j;
        const neLng = mapBounds.Sa.j;

        return fetch('http://localhost:8080/diveSites/loadDiveSitesInBounds',{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                swLat: swLat,
                swLng: swLng,
                neLat: neLat,
                neLng: neLng,
            })
        })
        .then(res => {
            return res.json();
        })
        .then(result => {
            console.log(result.sites);
            setDiveSites(result.sites);
        })
        .catch(err => {
            console.log('Caught.');
            console.log(err);  
        });
    }

    async function loadDiveShopsInBounds(mapBounds) {
        // You can await here
        console.log('loadDiveShopsInBounds');
        console.log(mapBounds);
        const swLat = mapBounds.Ya.i;
        const swLng = mapBounds.Sa.i;
        const neLat = mapBounds.Ya.j;
        const neLng = mapBounds.Sa.j;

        return fetch('http://localhost:8080/diveShops/loadDiveShopsInBounds',{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                swLat: swLat,
                swLng: swLng,
                neLat: neLat,
                neLng: neLng,
            })
        })
        .then(res => {
            return res.json();
        })
        .then(result => {
            console.log(result.shops);
            setDiveShops(result.shops);
        })
        .catch(err => {
            console.log('Caught.');
            console.log(err);  
        });
    }


    return (
        
        <SiteContext.Provider value = { [selectedSite, setSelectedSite] }>
        <DiveSitesContext.Provider value = { [diveSites, setDiveSites] }>
        <CoordsContext.Provider value = {[coords, setCoords]}>
        <LoadDiveSiteContext.Provider value = {loadDiveSites} >
        <DetailsContext.Provider value = {[moreDetails, setMoreDetails]}>
        <LoadDiveSiteInBoundsContext.Provider value = {loadDiveSitesInBounds}>
        <LoadDiveShopsInBoundsContext.Provider value = {loadDiveShopsInBounds}>
        <DiveShopsContext.Provider value = { [diveShops, setDiveShops] }>
        <ShopContext.Provider value = { [selectedShop, setSelectedShop] }>

            {props.children}

        </ShopContext.Provider>  
        </DiveShopsContext.Provider>  
        </LoadDiveShopsInBoundsContext.Provider>  
        </LoadDiveSiteInBoundsContext.Provider>  
        </DetailsContext.Provider>  
        </LoadDiveSiteContext.Provider>        
        </CoordsContext.Provider>
        </DiveSitesContext.Provider>
        </SiteContext.Provider>

    );
}

