import React, {useState, useContext} from 'react';

import classes from './DiveShopsView.module.scss';


import AddDiveShop from '../../../../components/Forms/Diveshop/AddDiveShop/AddDiveShop';
import EditDiveShop from '../../../../components/Forms/Diveshop/EditDiveShop/EditDiveShop';
import DeleteDiveShop from '../../../../components/Forms/Diveshop/DeleteDiveShop/DeleteDiveShop';
import DiveShopUserList from './DiveShopUserList/DiveShopUserList';

import DiveShopListingPanel from '../../../../components/Diveshop/DiveshopListingPanel/DiveshopListingPanel';



import { 
    AddDiveShopModalContext,
    EditDiveShopModalContext,
    DeleteDiveShopModalContext,
    DiveShopAdminContext
} from '../../../../context/UserContext';

import { DiveShopsContext } from '../../../../context/DiveSiteContext';

import { AccountContext } from '../../../../context/AuthContext';

const DiveShopsView = (props) => {

    const [addDiveShopModal, setAddDiveShopModal] = useContext(AddDiveShopModalContext);
    const [editDiveShopModal, setEditDiveShopModal] = useContext(EditDiveShopModalContext);
    const [deleteDiveShopModal, setDeleteDiveShopModal] = useContext(DeleteDiveShopModalContext);
    const [diveShopAdmin, setDiveShopAdmin] = useContext(DiveShopAdminContext);
    const [ account, setAccount ] = useContext(AccountContext);

    const shops = props.shops;

    console.log(shops);


    return (
        <div className={classes.diveShopsView}>
          
            {!addDiveShopModal && !editDiveShopModal && !deleteDiveShopModal && (
                <div className={classes.diveShopsHome}>
                    <span onClick={() => setDiveShopAdmin(false)} className={classes.backBtn}>Back</span>
                    <h1>Dive Shops View</h1>
                    <p className={classes.instructions}>This is the admin section for Dive shops. Simply press anywhere on the map to add a new dive shop. To edit the site, simple press on the marker.
                       Inside the edit form, there is a link to delete the shop if needed.</p>

                       <div className={classes.diveShopUserList}>
            <div className={classes.diveShopUserList__titleContainer}>
                <h3 className={classes.header}> {account.username}'s Added Shops  ·   {shops.length} shops</h3>
            </div>
            {shops.map(shop => (
                <DiveShopListingPanel shop={shop} edit={true} setEditDiveShopModal={setEditDiveShopModal}/>
            ))}
        </div>
                </div>
            )}

            {addDiveShopModal && (
                <AddDiveShop/>
            )}
            {editDiveShopModal && (
                <EditDiveShop/>
            )}
            {deleteDiveShopModal && (
                <DeleteDiveShop/>
            )}



        </div>
    );
};

export default DiveShopsView;