import React, { useState, createContext } from 'react';

export const SiteContext = createContext();
export const DiveSitesContext = createContext();
export const CoordsContext = createContext();
export const LoadDiveSiteContext = createContext();
export const DetailsContext = createContext();
export const LocationNameContext = createContext();




export const DiveSiteProvider = (props) => {

    
    const [ selectedSite, setSelectedSite ] = useState(null);

    const [moreDetails, setMoreDetails] = useState(false);

    const [diveSites, setDiveSites] = useState([]);

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


    return (
        
        <SiteContext.Provider value = { [selectedSite, setSelectedSite] }>
        <DiveSitesContext.Provider value = { [diveSites, setDiveSites] }>
        <CoordsContext.Provider value = {[coords, setCoords]}>
        <LoadDiveSiteContext.Provider value = {loadDiveSites} >
        <DetailsContext.Provider value = {[moreDetails, setMoreDetails]}>
        <LocationNameContext.Provider value = {[locationName, setLocationName]}>
        
        {props.children}
        
        </LocationNameContext.Provider>
        </DetailsContext.Provider>  
        </LoadDiveSiteContext.Provider>        
        </CoordsContext.Provider>
        </DiveSitesContext.Provider>
        </SiteContext.Provider>

    );
}

