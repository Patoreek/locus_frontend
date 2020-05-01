import React, { useState, createContext } from 'react';

export const SiteContext = createContext();
export const DiveSitesContext = createContext();
export const CoordsContext = createContext();



export const DiveSiteProvider = (props) => {

    
    const [ selectedSite, setSelectedSite ] = useState(null);

    const [diveSites, setDiveSites] = useState([]);

    const [coords, setCoords] = useState({
        lat: '',
        lng: ''
    });


    return (
        
        <SiteContext.Provider value = { [selectedSite, setSelectedSite] }>
        <DiveSitesContext.Provider value = { [diveSites, setDiveSites] }>
        <CoordsContext.Provider value = {[coords, setCoords]}>

                {props.children}
                
        </CoordsContext.Provider>
        </DiveSitesContext.Provider>
        </SiteContext.Provider>

    );
}

