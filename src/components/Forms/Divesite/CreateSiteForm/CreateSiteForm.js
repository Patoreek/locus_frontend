import React, {useState, useContext } from 'react';

import { CoordsContext,
         LoadDiveSiteContext } from '../../../../context/DiveSiteContext';
import { AccountContext } from '../../../../context/AuthContext';

import { AddModalContext } from '../../../../context/UserContext';

import ImageUpload from '../../../ImageUpload/ImageUpload';



import classes from './CreateSiteForm.module.scss';





const CreateSiteForm = (props) => {

    const [coords, setCoords] = useContext(CoordsContext);
    const [account, setAccount] = useContext(AccountContext);
    const loadDiveSites = useContext(LoadDiveSiteContext);
    const [showAddModal, setShowAddModal] = useContext(AddModalContext);

   


    const [name, setName] = useState("");
    const [suburb, setSuburb] = useState(null);
    const [city, setCity] = useState(null);
    const [state, setState] = useState("New South Wales"); //! CHANGE BACK TO "" OR NULL
    const [country, setCountry] = useState("Australia"); //! CHANGE BACK TO "" OR NULL
    const [description, setDescription] = useState("");
    const [experience, setExperience] = useState();
    const [siteType, setSiteType] = useState("reef");
    const [access, setAccess] = useState("rocks");
    const [maxDepth, setMaxDepth] = useState();
    const [avgDepth, setAvgDepth] = useState();
    const [minTemp, setMinTemp] = useState();
    const [maxTemp, setMaxTemp] = useState();
    const [minVis, setMinVis] = useState();
    const [maxVis, setMaxVis] = useState();
    const [suitable, setSuitable] = useState('greatSnorkel');
    

    const coordsLat = coords.lat;
    const coordsLng = coords.lng;

    const createDiveSite = () => {


        return fetch('http://localhost:8080/diveSites/createSite',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                diveSite: {
                    userId: account.id,
                    name: name,
                    suburb: suburb,
                    city: city,
                    state: state,
                    country: country,
                    latitude: coordsLat,
                    longitude: coordsLng,
                    description: description,
                    siteType: siteType,
                    access: access,
                    avgDepth: avgDepth,
                    maxDepth: maxDepth,
                    minTemp: minTemp,
                    maxTemp: maxTemp,
                    minVis: minVis,
                    maxVis: maxVis,
                    suitable: suitable,
                    experience: experience
                }
            })
        })
        .then(res => {
            return res.json();
        })
        .then(result => {
            console.log(result);
            setShowAddModal(false);
            loadDiveSites();
        })
        .catch(err => {
            console.log(err);
        });
    }


    const handleSubmit = (event) => {
        event.preventDefault();
       createDiveSite();
       // name, area, description, type, latitude, longitude, userId, loadDiveSites, setShowAddModal
    }
   

    return (
        <div>
            {/* IF showDeleteModal is false then show edit modal */}
            <div className={classes.form}>
                    <div className={classes.form__backBtnContainer}>
                        <span className={classes.backBtn} onClick={() => setShowAddModal(false)}>Back</span>
                    </div>
                    <div className={classes.form__headerContainer}>
                        <h3 className={classes.header}>Create a new dive site</h3>
                    </div>
                    <div className={classes.form__nameContainer}>
                        <input  className={`${classes.input} ${classes.input__name}`}
                                //placeholder="Name of Dive Site"
                                value={name}
                                onChange={e => setName(e.target.value)} />
                        <span className={classes.label}>Name</span>
                    </div>
                    
                    <div className={classes.form__suburbContainer}>
                        <input className={`${classes.input} ${classes.input__suburb}`}
                                //placeholder="suburb / Suburb"
                                value={suburb}
                                onChange={e => setSuburb(e.target.value)} />
                        <span>Suburb</span>
                    </div>

                    <div className={classes.form__cityContainer}>
                        <input className={`${classes.input} ${classes.input__city}`}
                                //placeholder="city / city"
                                value={city}
                                onChange={e => setCity(e.target.value)} />
                        <span>City</span>
                    </div>

                    <div className={classes.form__stateContainer}>
                        <input className={`${classes.input} ${classes.input__state}`}
                                //placeholder="state / state"
                                //value={state} //! CHANGE THIS BACK
                                value="New South Wales"
                                onChange={e => setState(e.target.value)} />
                        <span>State</span>
                    </div>

                    <div className={classes.form__countryContainer}>
                        <input className={`${classes.input} ${classes.input__country}`}
                                //placeholder="Country"
                                //value={country} //! CHANGE THIS BACK
                                value="Australia"
                                onChange={e => setCountry(e.target.value)} />
                        <span>Country</span>
                    </div>
                  

                    <div className={classes.form__descriptionContainer}>
                        <textarea className={`${classes.input} ${classes.input__description}`}
                                    rows="10"
                                    value={description}
                                    //placeholder="Description"
                                    onChange={e => setDescription(e.target.value)} />
                        <span>Description</span>
                    </div>
                  
                    <div className={classes.form__section1}>
                        <div className={classes.accessContainer}>
                            {/* <span className={classes.accessContainer__title}>Access from:</span> Dive Type */}
                            <select value={access} onChange={e => setAccess(e.target.value)} className={`${classes.input} ${classes.accessContainer__input}`}>
                                <option value="Beach">Beach</option>
                                <option value="Boat">Boat</option>
                                <option value="Dock">Dock</option>
                                <option value="Rocks">Rocks</option>
                                <option value="Rocks">Ramp</option>
                            </select>
                            <span>Access</span>
                        </div>
                        
                        <div className={classes.siteTypeContainer}>
                            <select value={siteType} onChange={e => setSiteType(e.target.value)} className={`${classes.input} ${classes.siteTypeContainer__input}`}>
                                <option value="Reef">Reef</option>
                                <option value="Wreck">Wreck</option>
                                <option value="Cave">Cave</option>
                                <option value="Deep">Deep</option>
                                <option value="Drift">Drift</option>
                                <option value="Wall">Wall</option>
                                <option value="Ice">Ice</option>
                            </select>
                            <span>Site Type</span>
                        </div>

                        <div className={classes.maxDepthContainer}>
                            {/* <span className={classes.maxDepthContainer__title}>Max Depth</span> */}
                            <input   className={`${classes.input} ${classes.input__maxDepth}`}
                                    //placeholder="Max Depth"
                                    value={maxDepth}
                                    onChange={e => setMaxDepth(e.target.value)} />
                            <span>Max Depth</span>
                        </div>
                        
                        <div className={classes.avgDepthContainer}>
                            {/* <span className={classes.avgDepthContainer__title}>Avg Depth</span> */}
                            <input   className={`${classes.input} ${classes.input__avgDepth}`}
                                    //placeholder="Max Depth"
                                    value={avgDepth}
                                    onChange={e => setAvgDepth(e.target.value)} 
                                    />
                            <span>Average Depth</span>
                        </div>
                        
                    </div>

                    <div className={classes.form__section2}>
                        <div className={classes.temperatureContainer}>
                            <h5 className={classes.temperatureContainer__title}>Temperature (C)</h5>
                                <div className={classes.minTempContainer}>
                                    <input className={`${classes.input} ${classes.input__minTemp}`}
                                        //placeholder="Average Minimum Temperature"
                                        value={minTemp}
                                        onChange={e => setMinTemp(e.target.value)} 
                                        />
                                    <span>Minimum Temperature</span>
                                </div>
                                <div className={classes.maxTempContainer}>
                                    <input className={`${classes.input} ${classes.input__maxTemp}`}
                                        //placeholder="Average Maximum Temperature"
                                        value={maxTemp}
                                        onChange={e => setMaxTemp(e.target.value)} 
                                        />
                                    <span>Maximum Temperature</span>
                                </div>
                        </div>
                 
                    
                        
                        <div className={classes.visibilityContainer}>
                            <h5 className={classes.visibilityContainer__title}>Visibility (m)</h5>
                            <div className={classes.minVisContainer}>
                                <input className={`${classes.input} ${classes.input__minVis}`}
                                    // placeholder="Average Minimum Visibility"
                                    value={minVis}
                                    onChange={e => setMinVis(e.target.value)} 
                                    />
                                <span>Minimum Visibility</span>
                            </div>
                            <div className={classes.maxVisContainer}>
                                <input className={`${classes.input} ${classes.input__maxVis}`}
                                    // placeholder="Average Maximum Visibility"
                                    value={maxVis}
                                    onChange={e => setMaxVis(e.target.value)} 
                                    />
                                <span>Maximum Visibility</span>
                            </div>
                        </div>
                    </div>
                    

                    <div className={classes.form__section3}>
                        <div className={classes.experienceContainer}>
                            <select  value={experience} onChange={e => setExperience(e.target.value)}  className={classes.input}>
                                <option value="Snorkel Friendly">Snorkel Friendly</option>
                                <option value="Free Diver">Free Diver</option>
                                <option value="Open Water Diver">Open Water Diver</option>
                                <option value="Advanced Open Water Diver">Advanced Open Water Diver</option>
                                <option value="Rescue Diver">Rescue Diver</option>
                                <option value="Master Scuba Diver">Master Scuba Diver</option>
                                <option value="Enriched Air Diver">Enriched Air Diver</option>
                                <option value="Equipment Specialist Diver">Equipment Specialist Diver</option>
                                <option value="Deep Diver">Deep Diver</option>
                                <option value="Wreck Diver">Wreck Diver</option>
                                <option value="Cave Diver">Wreck Diver</option>
                                <option value="Sidemount Diver">Sidemount Diver</option>
                                <option value="PADI Instructor">PADI Instructor</option>
                                <option value="Divemaster">Divemaster</option>

                            </select>
                           
                            <span>Experience</span>
                        </div>
                        
                    </div>
            
                    <div className={classes.form__section4}>
                        <div className={classes.suitableContainer}>
                            <select  value={suitable} onChange={e => setSuitable(e.target.value)}  className={classes.input}>
                                <option value="Great for Snorkelling">Great for Snorkelling</option>
                                <option value="Great for beginner SCUBA Divers">Great for beginner SCUBA Divers</option>
                                <option value="Can be challenging">Can be challenging</option>
                                <option value="Experienced Divers Only">Experienced Divers Only</option>
                                <option value="Great for Free Diving">Great for Free Diving</option>
                            </select>
                            <span>Suitable for</span> {/* Dive Type */}
                        </div>
                    </div>

                    <div className={classes.form__cancelBtnContainer}>
                        <button className={classes.cancelBtn} onClick={() => setShowAddModal(false)}>Cancel</button>
                    </div>

                    <div className={classes.form__addBtnContainer}>
                        <input
                                placeholder="Add"
                                type="submit"
                                onClick={(e) => handleSubmit(e)}
                                className={classes.addBtn}/>
                    </div>

                    {/* <div className={classes.form__messageContainer}>
                        {isError ? <p className={classes.errorMsg}>Whoops! Something went wrong!</p> : null }
                        {errMsg.map(message => <p className={classes.errorMsg}>{message}</p>)}
                                
                    </div> */}

                  </div>
            
        </div>
    );
};

export default CreateSiteForm;