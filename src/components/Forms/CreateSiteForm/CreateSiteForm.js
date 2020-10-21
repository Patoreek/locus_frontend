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
                        <span className={classes.backBtn} onClick={() => setShowAddModal(false)}>Back to list</span>
                    </div>
                    <div className={classes.form__headerContainer}>
                        <h3 className={classes.header}>Add a Dive site</h3>
                    </div>
                    <div className={classes.form__nameContainer}>
                        <input  className={`${classes.input} ${classes.input__name}`}
                                placeholder="Name of Dive Site"
                                value={name}
                                onChange={e => setName(e.target.value)} />
                    </div>
                    
                    <div className={classes.form__areaContainer}>
                        <input className={`${classes.input} ${classes.input__area}`}
                                placeholder="Area / Suburb"
                                value={area}
                                onChange={e => setArea(e.target.value)} />
                    </div>
                    <div className={classes.form__countryContainer}>
                        <input className={`${classes.input} ${classes.input__country}`}
                                placeholder="Country"
                                value={country}
                                onChange={e => setCountry(e.target.value)} />
                    </div>
                  

                    <div className={classes.form__descriptionContainer}>
                        <textarea className={`${classes.input} ${classes.input__description}`}
                                    rows="10"
                                    value={description}
                                    placeholder="Description"
                                    onChange={e => setDescription(e.target.value)} />
                    </div>
                  
                    <div className={classes.form__section1}>
                        <div className={classes.accessContainer}>
                            <span className={classes.accessContainer__title}>Access from:</span> {/* Dive Type */}
                            <select value={access} onChange={e => setAccess(e.target.value)} className={classes.accessContainer__input}>
                                <option value="rocks">Rocks</option>
                                <option value="boat">Boat</option>
                                <option value="beach">Beach</option>
                            </select>
                        </div>
                            {/* <input type="radio" 
                                aria-label="shore" 
                                label="Shore Dive" 
                                name="Type" 
                                value={Type} 
                                onChange={e => setType("1")}
                                checked={Type == 1}
                                className={classes.radioButton}
                        />
                        <span>Boat</span>
                        <input type="radio" 
                                aria-label="boat" 
                                label="Boat Dive" 
                                name="Type" 
                                value={Type} 
                                onChange={e => setType("2")}
                                checked={Type == 2}
                                className={classes.radioButton}
                        /> */}
                        <div className={classes.siteTypeContainer}>
                            <span className={classes.siteTypeContainer__title}>Site Type:</span>
                            <select value={siteType} onChange={e => setSiteType(e.target.value)} className={classes.siteTypeContainer__input}>
                                <option value="reef">Reef</option>
                                <option value="wreck">Wreck</option>
                                <option value="cave">Cave</option>
                                <option value="deep">Deep</option>
                            </select>
                     
                        </div>

                        <div className={classes.maxDepthContainer}>
                            <span className={classes.maxDepthContainer__title}>Max Depth</span>
                            <input   className={`${classes.input} ${classes.input__maxDepth}`}
                                    placeholder="Max Depth"
                                    value={maxDepth}
                                    onChange={e => setMaxDepth(e.target.value)} />
                        </div>
                        
                        <div className={classes.avgDepthContainer}>
                            <span className={classes.avgDepthContainer__title}>Avg Depth</span>
                            <input   className={`${classes.input} ${classes.input__avgDepth}`}
                                    placeholder="Max Depth"
                                    value={avgDepth}
                                    onChange={e => setAvgDepth(e.target.value)} 
                                    />
                        </div>
                        
                    </div>

                    <div className={classes.form__section2}>
                        <div className={classes.temperatureContainer}>
                            <span className={classes.temperatureContainer__title}>Temperature (C)</span>
                                <input className={`${classes.input} ${classes.input__minTemp}`}
                                    placeholder="Average Minimum Temperature"
                                value={minTemp}
                                onChange={e => setMinTemp(e.target.value)} 
                                />
                                <input className={`${classes.input} ${classes.input__maxTemp}`}
                                    placeholder="Average Maximum Temperature"
                                value={maxTemp}
                                onChange={e => setMaxTemp(e.target.value)} 
                                />
                        </div>
                        
                        <div className={classes.visibilityContainer}>
                        <span className={classes.visibilityContainer__title}>Visibility (m)</span>
                            <input className={`${classes.input} ${classes.input__minVis}`}
                                placeholder="Average Minimum Visibility"
                               value={minVis}
                               onChange={e => setMinVis(e.target.value)} 
                            />
                            <input className={`${classes.input} ${classes.input__maxVis}`}
                                placeholder="Average Maximum Visibility"
                               value={maxVis}
                               onChange={e => setMaxVis(e.target.value)} 
                            />
                        </div>
                    </div>

                    <div className={classes.form__section3}>
                        <span className={classes.header}>Diver Experience</span>
                        <input className={`${classes.input} ${classes.input__experience}`}
                                placeholder="Advanced Open Water Diver"
                               value={experience}
                               onChange={e => setExperience(e.target.value)} 
                            />
                       
                    </div>
            
                    <div className={classes.form__section4}>
                            <span className={classes.title}>Suitable for:</span> {/* Dive Type */}
                            <select  value={suitable} onChange={e => setSuitable(e.target.value)}  className={classes.input}>
                                <option value="greatSnorkel">Great for snorkelling</option>
                                <option value="greatScuba">Great for scuba</option>
                                <option value="greatFreedive">Great for free diving</option>
                            </select>
                        </div>

                    <div className={classes.form__cancelBtnContainer}>
                        <button className={classes.cancelBtn}>Cancel</button>
                    </div>

                    <div className={classes.form__addBtnContainer}>
                        <input
                                placeholder="Add"
                                type="submit"
                                onClick={(e) => handleSubmit(e)}
                                className={classes.addBtn}/>
                    </div>

                  </div>
        </div>
    );
};

export default CreateSiteForm;