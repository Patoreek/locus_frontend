import React, { useState, createContext } from "react";

export const EditModalContext = createContext();

export const DeleteModalContext = createContext();

export const AddModalContext = createContext();

export const AddRequestContext = createContext();

export const SiteListContext = createContext();

export const DiveShopAdminContext = createContext();

export const AddDiveShopModalContext = createContext();

export const EditDiveShopModalContext = createContext();

export const DeleteDiveShopModalContext = createContext();

export const UserProvider = (props) => {
  const [showEditModal, setShowEditModal] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddRequestModal, setShowAddRequestModal] = useState(false);
  const [showSiteList, setShowSiteList] = useState(false);

  const [diveShopAdmin, setDiveShopAdmin] = useState(false);

  const [addDiveShopModal, setAddDiveShopModal] = useState(false);
  const [editDiveShopModal, setEditDiveShopModal] = useState(false);
  const [deleteDiveShopModal, setDeleteDiveShopModal] = useState(false);

  return (
    <EditModalContext.Provider value={[showEditModal, setShowEditModal]}>
      <DeleteModalContext.Provider
        value={[showDeleteModal, setShowDeleteModal]}
      >
        <AddModalContext.Provider value={[showAddModal, setShowAddModal]}>
          <AddRequestContext.Provider
            value={[showAddRequestModal, setShowAddRequestModal]}
          >
            <SiteListContext.Provider value={[showSiteList, setShowSiteList]}>
              <DiveShopAdminContext.Provider
                value={[diveShopAdmin, setDiveShopAdmin]}
              >
                <AddDiveShopModalContext.Provider
                  value={[addDiveShopModal, setAddDiveShopModal]}
                >
                  <EditDiveShopModalContext.Provider
                    value={[editDiveShopModal, setEditDiveShopModal]}
                  >
                    <DeleteDiveShopModalContext.Provider
                      value={[deleteDiveShopModal, setDeleteDiveShopModal]}
                    >
                      {props.children}
                    </DeleteDiveShopModalContext.Provider>
                  </EditDiveShopModalContext.Provider>
                </AddDiveShopModalContext.Provider>
              </DiveShopAdminContext.Provider>
            </SiteListContext.Provider>
          </AddRequestContext.Provider>
        </AddModalContext.Provider>
      </DeleteModalContext.Provider>
    </EditModalContext.Provider>
  );
};
