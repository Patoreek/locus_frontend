import React, {useState, useContext } from 'react';

import { CoordsContext,
         LoadDiveSiteContext } from '../../../context/DiveSiteContext';
import { AccountContext } from '../../../context/AuthContext';

import { AddModalContext } from '../../../context/UserContext';

import ImageUpload from '../../ImageUpload/ImageUpload';



import classes from './CreateSiteForm.module.scss';





const CreateSiteForm = (props) => {

    const [coords, setCoords] = useContext(CoordsContext);
    const [account, setAccount] = useContext(AccountContext);
    const loadDiveSites = useContext(LoadDiveSiteContext);
    const [showAddModal, setShowAddModal] = useContext(AddModalContext);

   


    const [name, setName] = useState("");
    const [area, setArea] = useState("");
    const [country, setCountry] = useState("");
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
                    area: area,
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
        // const name = name;
        // const area = area;
        // const description = description;
        // const latitude = coordsLat;
        // const longitude = coordsLng;
        // const userId = account.id;

        // const country = country;
        

        // const experience = experience;
        // const siteType = siteType;
        // const access = access;
        // const maxDepth = maxDepth;
        // const avgDepth = avgDepth;
        // const minTemp = minTemp;
        // const maxTemp = maxTemp;
        // const minVis = minVis;
        // const maxVis = maxVis;
        // const suitable = suitable;


        console.log('Name:' + name);
        console.log('Area:' + area);
        console.log('Country:' + country);
        console.log('Description:' + description);
        console.log('Site Type:' + siteType);
        console.log('Access:' + access);
        console.log('Max Depth:' + maxDepth);
        console.log('Avg Depth:' + avgDepth);
        console.log('Min Temp:' + minTemp);
        console.log('Max Temp:' + maxTemp);
        console.log('Min Vis:' + minVis);
        console.log('Max Vis:' + maxVis);
        console.log('suitablility:' + suitable);

     


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
                                <option value="rocks">Rocks</option>
                                <option value="boat">Boat</option>
                                <option value="beach">Beach</option>
                            </select>
                            <span>Access</span>
                        </div>
                        
                        <div className={classes.siteTypeContainer}>
                            <select value={siteType} onChange={e => setSiteType(e.target.value)} className={`${classes.input} ${classes.siteTypeContainer__input}`}>
                                <option value="reef">Reef</option>
                                <option value="wreck">Wreck</option>
                                <option value="cave">Cave</option>
                                <option value="deep">Deep</option>
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
                            <input className={`${classes.input} ${classes.input__experience}`}
                                // placeholder="Advanced Open Water Diver"
                                value={experience}
                                onChange={e => setExperience(e.target.value)} 
                                />
                            <span>Diver Experience</span>
                        </div>
                        
                    </div>
            
                    <div className={classes.form__section4}>
                        <div className={classes.suitableContainer}>
                            <select  value={suitable} onChange={e => setSuitable(e.target.value)}  className={classes.input}>
                                <option value="greatSnorkel">Great for snorkelling</option>
                                <option value="greatScuba">Great for scuba</option>
                                <option value="greatFreedive">Great for free diving</option>
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