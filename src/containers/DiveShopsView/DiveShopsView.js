import React, {useState, useContext} from 'react';

import classes from './DiveShopsView.module.scss';


import AddDiveShop from '../../components/DiveShops/AddDiveShop/AddDiveShop';
import EditDiveShop from '../../components/DiveShops/EditDiveShop/EditDiveShop';
import DeleteDiveShop from '../../components/DiveShops/DeleteDiveShop/DeleteDiveShop';


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
        <div>
            <h1>Dive Shops View</h1>
            {!addDiveShopModal && !editDiveShopModal && !deleteDiveShopModal && (
                <div className={classes.diveShopsHome}>
                    <span onClick={() => setDiveShopAdmin(false)} className={classes.backBtn}>Back</span>
                    <button onClick={() => setAddDiveShopModal(true)}>Add Shop</button>
                    <button onClick={() => setEditDiveShopModal(true)}>Edit Shop</button>
                    <button onClick={() => setDeleteDiveShopModal(true)}>Delete Shop</button>
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