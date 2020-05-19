import React, {useContext, useEffect, useState} from 'react';

import classes from './UserSiteList.module.css';

import { AccountContext } from '../../../../context/AuthContext';
import { AddModalContext,
         EditModalContext,
         DeleteModalContext } from '../../../../context/UserContext';


import SiteList from './SiteList/SiteList';

const UserSiteList = () => {

    const [account, setAccount] = useContext(AccountContext);

    const [sites, setSites] = useState(null);

    const [listLoading, setListLoading] = useState(true);

    const [showEditModal, setShowEditModal] = useContext(EditModalContext);
    const [showAddModal, setShowAddModal] = useContext(AddModalContext);
    const [showDeleteModal, setShowDeleteModal] = useContext(DeleteModalContext);


    useEffect(() => {
        async function loadMyDiveSites() {
            
            console.log('[UserSiteList] Account = ' + account.id);
            // You can await here
            try {
                const response = await fetch('http://localhost:8080/diveSites/mySites/' + account.id,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                //const sites = data.sites;
                setSites(data.sites);
                setListLoading(false);
            } catch (err) {
                
            }
        }
       

        loadMyDiveSites();
        console.log('[UserSiteList]' + sites);
        
    }, [showAddModal,showDeleteModal,showEditModal]);

 

    // if (!listLoading) {
    //     console.log('[in isloading if check] and sites = ' + sites);

    //     console.log('[List] = ' + list);
    // }
    
    return (
       
        <div>
            <h1> My Sites </h1>
            {/* {sites.map(site => { */}
            {!listLoading ? <SiteList sites={sites}/> : <p>Not Loaded</p>}  
            {/* })} */}
        </div>
    );
};

export default UserSiteList;