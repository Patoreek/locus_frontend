import React, {useState, useContext} from 'react';

import classes from './DiveShopsView.module.scss';


import AddDiveShop from '../../components/DiveShops/AddDiveShop/AddDiveShop';
import EditDiveShop from '../../components/DiveShops/EditDiveShop/EditDiveShop';
import DeleteDiveShop from '../../components/DiveShops/DeleteDiveShop/DeleteDiveShop';
import DiveShopUserList from '../../containers/DiveShopsView/DiveShopUserList/DiveShopUserList';



import { 
    AddDiveShopModalContext,
    EditDiveShopModalContext,
    DeleteDiveShopModalContext,
    DiveShopAdminContext
} from '../../context/UserContext';

const DiveShopsView = () => {

    const [addDiveShopModal, setAddDiveShopModal] = useContext(AddDiveShopModalContext);
    const [editDiveShopModal, setEditDiveShopModal] = useContext(EditDiveShopModalContext);
    const [deleteDiveShopModal, setDeleteDiveShopModal] = useContext(DeleteDiveShopModalContext);
    const [diveShopAdmin, setDiveShopAdmin] = useContext(DiveShopAdminContext);


    return (
        <div className={classes.diveShopsView}>
          
            {!addDiveShopModal && !editDiveShopModal && !deleteDiveShopModal && (
                <div className={classes.diveShopsHome}>
                    <span onClick={() => setDiveShopAdmin(false)} className={classes.backBtn}>Back</span>
                    <h1>Dive Shops View</h1>
                    <p className={classes.instructions}>This is the admin section for Dive shops. Simply press anywhere on the map to add a new dive shop. To edit the site, simple press on the marker.
                       Inside the edit form, there is a link to delete the shop if needed.</p>

                    <DiveShopUserList/>
                    {/* <button onClick={() => setAddDiveShopModal(true)}>Add Shop</button>
                    <button onClick={() => setEditDiveShopModal(true)}>Edit Shop</button>
                    <button onClick={() => setDeleteDiveShopModal(true)}>Delete Shop</button> */}
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