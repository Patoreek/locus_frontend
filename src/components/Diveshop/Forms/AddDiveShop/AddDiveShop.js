import React, { useState, useContext, useEffect } from "react";
import classes from "./AddDiveShop.module.scss";

import { AddDiveShopModalContext } from "../../../../context/UserContext";

import { CoordsContext } from "../../../../context/DiveSiteContext";

import { AccountContext } from "../../../../context/AuthContext";

import Select from "react-select";
import makeAnimated from "react-select/animated";

const AddDiveShop = () => {
  const [name, setName] = useState("");
  const [suburb, setSuburb] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [website, setWebsite] = useState();
  const [facebook, setFacebook] = useState();
  const [twitter, setTwitter] = useState();
  const [instagram, setInstagram] = useState();
  const [tradingHours, setTradingHours] = useState([]);
  const [associatedDiveSites, setAssociatedDiveSites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [diveSiteList, setDiveSiteList] = useState([]);

  const [addDiveShopModal, setAddDiveShopModal] = useContext(
    AddDiveShopModalContext
  );

  const [coords, setCoords] = useContext(CoordsContext);
  const [account, setAccount] = useContext(AccountContext);

  const animatedComponents = makeAnimated();

  useEffect(() => {
    async function getSites() {
      try {
        const response = await fetch(
          "http://localhost:8080/diveSites/getSites",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const sites = await response.json();

        let sitesArray = [];

        sites.site.map((site) => {
          sitesArray.push({
            value: site._id,
            label: site.name + ", " + site.area,
          });
        });

        setDiveSiteList(sitesArray);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(null);
      }
    }
    getSites();
  }, []);

  const handleSubmit = () => {
    return fetch("http://localhost:8080/diveShops/addShop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        diveShop: {
          userId: account.id,
          latitude: coords.lat,
          longitude: coords.lng,
          name: name,
          suburb: suburb,
          country: country,
          address: address,
          phone: phone,
          email: email,
          website: website,
          facebook: facebook,
          twitter: twitter,
          instagram: instagram,
          tradingHours: tradingHours,
          associatedDiveSites: associatedDiveSites,
        },
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        //console.log(result);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const diveSitesHandler = (e) => {
    //console.log(e);
    let valueArray = [];

    e.map((obj) => {
      valueArray.push(obj.value);
    });

    //console.log(valueArray);

    setAssociatedDiveSites(valueArray);
  };

  return (
    <div className={classes.form}>
      <div className={classes.form__backBtnContainer}>
        <span
          className={classes.backBtn}
          onClick={() => setAddDiveShopModal(false)}
        >
          Back
        </span>
      </div>
      <div className={classes.form__headerContainer}>
        <h3 className={classes.header}>Create a new dive shop</h3>
      </div>
      <div className={classes.form__nameContainer}>
        <input
          className={`${classes.input} ${classes.input__name}`}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span className={classes.label}>Name</span>
      </div>

      <div className={classes.form__suburbContainer}>
        <input
          className={`${classes.input} ${classes.input__suburb}`}
          value={suburb}
          onChange={(e) => setSuburb(e.target.value)}
        />
        <span>Suburb</span>
      </div>
      <div className={classes.form__countryContainer}>
        <input
          className={`${classes.input} ${classes.input__country}`}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <span>Country</span>
      </div>

      <div className={classes.form__phoneContainer}>
        <input
          className={`${classes.input} ${classes.input__phone}`}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <span>Phone</span>
      </div>

      <div className={classes.form__emailContainer}>
        <input
          className={`${classes.input} ${classes.input__email}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span>Email</span>
      </div>

      <div className={classes.form__addressContainer}>
        <input
          className={`${classes.input} ${classes.input__address}`}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <span>Address</span>
      </div>

      <div className={classes.form__websiteContainer}>
        <input
          className={`${classes.input} ${classes.input__website}`}
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <span>Website</span>
      </div>

      <div className={classes.form__facebookContainer}>
        <input
          className={`${classes.input} ${classes.input__facebook}`}
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        />
        <span>Facebook</span>
      </div>

      <div className={classes.form__instagramContainer}>
        <input
          className={`${classes.input} ${classes.input__instagram}`}
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
        <span>Instagram</span>
      </div>

      <div className={classes.form__twitterContainer}>
        <input
          className={`${classes.input} ${classes.input__twitter}`}
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
        />
        <span>Twitter</span>
      </div>

      {/*//! This should be a multi select input && Gather all sites with a 150km radius?? */}
      {!isLoading && (
        <div className={classes.form__associatedSitesContainer}>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            //defaultValue={[colourOptions[4], colourOptions[5]]}
            //value={colourOptions.find(obj => obj.value === selectedValue)}
            isMulti
            options={diveSiteList}
            onChange={diveSitesHandler}
          />

          <span>Associated Dive Sites</span>
        </div>
      )}

      <div className={classes.form__cancelBtnContainer}>
        <button
          className={classes.cancelBtn}
          onClick={() => setAddDiveShopModal(false)}
        >
          Cancel
        </button>
      </div>

      <div className={classes.form__addBtnContainer}>
        <input
          value="Add"
          type="submit"
          onClick={(e) => handleSubmit(e)}
          className={classes.addBtn}
        />
      </div>

      {/* <div className={classes.form__messageContainer}>
                        {isError ? <p className={classes.errorMsg}>Whoops! Something went wrong!</p> : null }
                        {errMsg.map(message => <p className={classes.errorMsg}>{message}</p>)}
                                
                    </div> */}
    </div>
  );
};

export default AddDiveShop;
