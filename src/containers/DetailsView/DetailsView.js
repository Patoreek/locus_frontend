import React, {useEffect, useContext} from 'react';

import { SiteContext } from '../../context/DiveSiteContext';
import { DetailsContext } from '../../context/GuestContext';

import DetailsContainer from './DetailsContainer/DetailsContainer';

import { useHistory } from 'react-router-dom';


import classes from './DetailsView.module.css';

const Details = () => {

    const [selectedSite, setSelectedSite] = useContext(SiteContext);
    const [moreDetails, setMoreDetails] = useContext(DetailsContext);

    let history = useHistory();


    // MAKE SURE THIS REDIRECTS IF THIS DOESNT HAVE A SELECTED SITE
    useEffect(() => {
        console.log(selectedSite);
        if (!selectedSite) {
                history.replace('/map');
        }       
    },[]);

    return (
        
        <DetailsContainer/>
            
        
    );
};

export default Details;