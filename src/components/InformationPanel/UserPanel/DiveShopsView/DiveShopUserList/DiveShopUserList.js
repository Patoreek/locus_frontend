import React, { useContext } from "react";

import classes from "./DiveShopUserList.module.scss";

import {
  DiveShopsContext,
  ShopContext,
} from "../../../../../context/DiveSiteContext";
import { AccountContext } from "../../../../../context/AuthContext";
import { EditDiveShopModalContext } from "../../../../../context/UserContext";

import DiveshopListingPanel from "../../../../../components/Diveshop/DiveshopListingPanel/DiveshopListingPanel";

const DiveShopUserList = () => {
  const [diveShops, setDiveShops] = useContext(DiveShopsContext);
  const [account, setAccount] = useContext(AccountContext);
  const [selectedShop, setSelectedShop] = useContext(ShopContext);

  const [editDiveShopModal, setEditDiveShopModal] = useContext(
    EditDiveShopModalContext
  );

  return (
    <div className={classes.diveShopUserList}>
      <div className={classes.diveShopUserList__titleContainer}>
        <h3 className={classes.header}>
          {" "}
          {account.username}'s Added Shops · {diveShops.length} shops in the
          area
        </h3>
      </div>
      {diveShops.map((shop) => (
        <DiveshopListingPanel shop={shop} edit={true} />
      ))}
    </div>
  );
};

export default DiveShopUserList;
