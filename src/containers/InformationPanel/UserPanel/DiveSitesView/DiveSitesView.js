import React, {useContext} from 'react';

import classes from './DiveSitesView.module.scss';

import { AccountContext } from '../../../../context/AuthContext';



import DivesiteListingPanel from '../../../../components/Divesite/DivesiteListingPanel/DivesiteListingPanel';


const DiveSitesView = (props) => {

    const [account, setAccount] = useContext(AccountContext);

    const sites = props.sites;

    return (
        <div className={classes.divesitesView}>
        <div className={classes.divesitesView__header}>
            <h3 className={classes.header}> {account.username}'s Sites  ·   {sites.length} sites</h3>
        </div>
        {sites.map(site => (
            <DivesiteListingPanel site={site} edit={true}/>
            //<h1> Testing</h1>
        ))}
    
    </div>
    );
};

export default DiveSitesView;