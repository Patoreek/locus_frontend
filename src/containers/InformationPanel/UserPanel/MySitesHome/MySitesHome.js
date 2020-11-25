import React, {useContext, useEffect, useState} from 'react';

import classes from './MySitesHome.module.scss';

import { AccountContext } from '../../../../context/AuthContext';
import { AddModalContext,
         EditModalContext,
         DeleteModalContext,
         AddRequestContext,
        SiteListContext,
        DiveShopAdminContext } from '../../../../context/UserContext';

import DiveShopsView from '../DiveShopsView/DiveShopsView';
import DiveSitesView from '../DiveSitesView/DiveSitesView';


const UserSiteList = () => {

    const [account, setAccount] = useContext(AccountContext);

    const [sites, setSites] = useState(null);
    const [shops, setShops] = useState(null);


    
    
    const [showEditModal, setShowEditModal] = useContext(EditModalContext);
    const [showAddModal, setShowAddModal] = useContext(AddModalContext);
    const [showDeleteModal, setShowDeleteModal] = useContext(DeleteModalContext);
    const [ showAddRequestModal, setShowAddRequestModal ] = useContext(AddRequestContext);
    const [ showSiteList, setShowSiteList ] = useContext(SiteListContext);
    
    
    const [diveShopAdmin, setDiveShopAdmin] = useContext(DiveShopAdminContext);
    
    const [diveSitesLoaded, setDiveSitesLoaded] = useState(false);
    const [diveShopsLoaded, setDiveShopsLoaded] = useState(false);
    const [listLoading, setListLoading] = useState(true);




    useEffect(() => {
        async function loadMyDiveSites() {
            
           // console.log('[UserSiteList] Account = ' + account.id);
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
                setDiveSitesLoaded(true);
                

            } catch (err) {
                
            }
        }

        loadMyDiveSites();
        //console.log('[UserSiteList]' + sites);
        
    }, [showAddModal,showDeleteModal,showEditModal]);


    useEffect(() => {
        async function loadMyDiveShops() {
            
            // console.log('[UserSiteList] Account = ' + account.id);
             // You can await here
             try {
                 const response = await fetch('http://localhost:8080/diveShops/myShops/' + account.id,{
                     method: 'GET',
                     headers: {
                         'Content-Type': 'application/json'
                     }
                 });
                 const data = await response.json();
                 console.log(data.shops);
                 setShops(data.shops);
                 setDiveShopsLoaded(true);
        
             } catch (err) {
                 
             }
         }
       
         loadMyDiveShops();
    }, []);

    useEffect(() => {
        if (diveShopsLoaded && diveSitesLoaded) {
            setListLoading(false);
        }

    }, [diveShopsLoaded, diveSitesLoaded]);

    return (
       
        <div>
            



            {/* //* WHAT IS DISPLAYED INITIALLY */}
            {!listLoading  && !showAddRequestModal && !diveShopAdmin && account.email === "patrick.minda@hotmail.com" && (
                <div className={classes.addRequestContainer}>
                    <h3 className={classes.addRequestContainer__header}>My Sites · Add & Edit Sites</h3>
                    <p className={classes.addRequestContainer__instructions}>
                    To add a dive site, simply press on the map at the location. A form will appear and fill out the details. 
                    </p>
                    <div className={classes.diveShopBtnContainer}>
                        <button onClick={() => setDiveShopAdmin(true)} className={classes.diveShopBtn}> See Dive shops</button>
                    </div>
                </div>
            )}

            {!listLoading && !diveShopAdmin && account.email === "patrick.minda@hotmail.com" && (
                <DiveSitesView sites={sites}/>
            )}
         

               
          

            
            {diveShopAdmin && (
                <DiveShopsView shops={shops}/>
            )}
         
 
        </div>
    );
};

export default UserSiteList;