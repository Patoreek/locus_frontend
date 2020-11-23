import React, {useState, useContext, useEffect} from 'react';
import classes from './EditDiveShop.module.scss';

import { FilePond } from 'react-filepond';
import "filepond/dist/filepond.min.css";

import Select from 'react-select';
import makeAnimated from 'react-select/animated';




import { 
    EditDiveShopModalContext,
    DeleteDiveShopModalContext
} from '../../../context/UserContext';

import { 
    ShopContext,
} from '../../../context/DiveSiteContext';



const EditDiveShop = () => {

    const [name, setName] = useState("");
    const [area, setArea] = useState(""); //? THIS IS ALSO REFERED AS SUBURB
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

    const [diveSiteList, setDiveSiteList] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [editDiveShopModal, setEditDiveShopModal] = useContext(EditDiveShopModalContext);
    const [deleteDiveShopModal, setDeleteDiveShopModal] = useContext(DeleteDiveShopModalContext);

    const [selectedShop, setSelectedShop] = useContext(ShopContext);

    const animatedComponents = makeAnimated();

    useEffect(() => {

        setName(selectedShop.name);
        setArea(selectedShop.area);
        setCountry(selectedShop.country);
        setAddress(selectedShop.address);
        setPhone(selectedShop.phone);
        setEmail(selectedShop.email);
        setWebsite(selectedShop.website);
        setFacebook(selectedShop.facebook);
        setTwitter(selectedShop.twitter);
        setInstagram(selectedShop.Instagram);
        setTradingHours(selectedShop.TradingHours);
        setAssociatedDiveSites(selectedShop.associatedDiveSites);

        async function getSites() {
            try {
                const response = await fetch('http://localhost:8080/diveSites/getSites',{
                    method: 'GET',
                    credentials: 'include',
                });
                const sites = await response.json();
                //console.log(sites);
               
                let sitesArray = [];

                sites.site.map(site => {
                    sitesArray.push({
                        value: site._id,
                        label: site.name + ", " + site.area
                    });
                });
                console.log('CONVERTED ARRAY');
                console.log(sitesArray);

                // setDiveSiteList(sites.site);
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
        console.log('Editing Dive Shop...');

        return fetch('http://localhost:8080/diveShops/editShop',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                diveShop: {
                    _id: selectedShop._id,
                    name: name,
                    area: area,
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
                }
            })
        })
        .then(res => {
            return res.json();
        })
        .then(result => {
            console.log(result);
            
        })
        .catch(err => {
            console.log(err);
        });
    }

    const deleteHandler = () => {
        setEditDiveShopModal(false);
        setDeleteDiveShopModal(true);
    }

    const diveSitesHandler = (e) => {
        console.log(e);
        let valueArray = [];

        e.map(obj => {
            valueArray.push(obj.value);
        });

        console.log(valueArray);


        setAssociatedDiveSites(valueArray);
    }

    return (
            <div className={classes.form}>
                    <div className={classes.form__backBtnContainer}>
                        <span className={classes.deleteBtn} onClick={deleteHandler}>Delete</span>
                        <span className={classes.backBtn} onClick={() => setEditDiveShopModal(false)}>Back</span>
                    </div>
                    <div className={classes.form__headerContainer}>
                        <h3 className={classes.header}>Edit Dive Shop</h3>
                    </div>
                    <div className={classes.form__nameContainer}>
                        <input  className={`${classes.input} ${classes.input__name}`}
                                //placeholder="Name of Dive Site"
                                value={name}
                                onChange={e => setName(e.target.value)} />
                        <span className={classes.label}>Name</span>
                    </div>
                    
                    <div className={classes.form__areaContainer}>
                        <input className={`${classes.input} ${classes.input__area}`}
                                //placeholder="Area / Suburb"
                                value={area}
                                onChange={e => setArea(e.target.value)} />
                        <span>Area</span>
                    </div>
                    <div className={classes.form__countryContainer}>
                        <input className={`${classes.input} ${classes.input__country}`}
                                //placeholder="Country"
                                value={country}
                                onChange={e => setCountry(e.target.value)} />
                        <span>Country</span>
                    </div>

                    {/* //! LOGO & BANNER UPLOAD HERE */}
                     <div className={classes.form__uploadLogoContainer}>
                    <FilePond 
                            className={`${classes.input} ${classes.input__uploadLogo}`}
                            allowMultiple={false}
                            name={"logo"}
                            server={
                                {
                                    url: "http://localhost:8080/diveShops/uploadLogo/" + selectedShop._id,
                                    process:{
                                        withCredentials: true
                                    }
                                }
                            }
                    />
                     <span>Logo Image</span>

                    </div>
                    <div className={classes.form__uploadBannerContainer}>
                    <FilePond 
                            className={`${classes.input} ${classes.input__uploadBanner}`}
                            allowMultiple={false}
                            name={"banner"}
                            server={
                                {
                                    url: "http://localhost:8080/diveShops/uploadBanner/" + selectedShop._id,
                                    process:{
                                        withCredentials: true
                                    }
                                }
                            }
                        />
                        <span>Banner Image</span>
                    </div>

                    <div className={classes.form__phoneContainer}>
                        <input className={`${classes.input} ${classes.input__phone}`}
                                    value={phone}
                                    //placeholder="phone"
                                    onChange={e => setPhone(e.target.value)} />
                        <span>Phone</span>
                    </div>

                    <div className={classes.form__emailContainer}>
                        <input className={`${classes.input} ${classes.input__email}`}
                                    value={email}
                                    //placeholder="email"
                                    onChange={e => setEmail(e.target.value)} />
                        <span>Email</span>
                    </div>


                    <div className={classes.form__addressContainer}>
                        <input className={`${classes.input} ${classes.input__address}`}
                                    value={address}
                                    //placeholder="Address"
                                    onChange={e => setAddress(e.target.value)} />
                        <span>Address</span>
                    </div>

                    <div className={classes.form__websiteContainer}>
                        <input className={`${classes.input} ${classes.input__website}`}
                                    value={website}
                                    //placeholder="website"
                                    onChange={e => setWebsite(e.target.value)} />
                        <span>Website</span>
                    </div>

                    <div className={classes.form__facebookContainer}>
                        <input className={`${classes.input} ${classes.input__facebook}`}
                                    value={facebook}
                                    //placeholder="facebook"
                                    onChange={e => setFacebook(e.target.value)} />
                        <span>Facebook</span>
                    </div>

                    <div className={classes.form__instagramContainer}>
                        <input className={`${classes.input} ${classes.input__instagram}`}
                                    value={instagram}
                                    //placeholder="instagram"
                                    onChange={e => setInstagram(e.target.value)} />
                        <span>Instagram</span>
                    </div>

                    <div className={classes.form__twitterContainer}>
                        <input className={`${classes.input} ${classes.input__twitter}`}
                                    value={twitter}
                                    //placeholder="twitter"
                                    onChange={e => setTwitter(e.target.value)} />
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
                        <button className={classes.cancelBtn} onClick={() => setEditDiveShopModal(false)}>Cancel</button>
                    </div>

                    <div className={classes.form__editBtnContainer}>
                        <input
                                value="Edit"
                                type="submit"
                                onClick={(e) => handleSubmit(e)}
                                className={classes.editBtn}/>
                    </div>

                    {/* <div className={classes.form__messageContainer}>
                        {isError ? <p className={classes.errorMsg}>Whoops! Something went wrong!</p> : null }
                        {errMsg.map(message => <p className={classes.errorMsg}>{message}</p>)}
                                
                    </div> */}

            
        </div>
    );
};

export default EditDiveShop;