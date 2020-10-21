import React, {useState, useContext} from 'react';

import { FilePond } from 'react-filepond';
import "filepond/dist/filepond.min.css";

import classes from './EditSiteForm.module.scss';

import { SiteContext, LoadDiveSiteContext } from '../../../context/DiveSiteContext';
import { EditModalContext, DeleteModalContext } from '../../../context/UserContext';

import CommonFeatures from './CommonFeatures/CommonFeatures';
import ImageUpload from '../../ImageUpload/ImageUpload';

import DeleteContainer from '../DeleteContainer/DeleteContainer';





const EditSiteForm = (props) => {

    const [selectedSite, setSelectedSite] = useContext(SiteContext);
    const [showEditModal, setShowEditModal] = useContext(EditModalContext);
    const [showDeleteModal, setShowDeleteModal] = useContext(DeleteModalContext);


    const loadDiveSites = useContext(LoadDiveSiteContext);


    const [name, setName] = useState(selectedSite.name);
    const [area, setArea] = useState(selectedSite.area);
    const [country, setCountry] = useState(selectedSite.country);
    const [description, setDescription] = useState(selectedSite.description);
    const [experience, setExperience] = useState(selectedSite.experience);
    const [siteType, setSiteType] = useState(selectedSite.siteType);
    const [latitude, setLatitude] = useState(selectedSite.latitude);
    const [longitude, setLongitude] = useState(selectedSite.longitude);
    const [access, setAccess] = useState(selectedSite.access);
    const [maxDepth, setMaxDepth] = useState(selectedSite.maxDepth);
    const [avgDepth, setAvgDepth] = useState(selectedSite.avgDepth);
    const [minTemp, setMinTemp] = useState(selectedSite.minTemp);
    const [maxTemp, setMaxTemp] = useState(selectedSite.maxTemp);
    const [minVis, setMinVis] = useState(selectedSite.minVis);
    const [maxVis, setMaxVis] = useState(selectedSite.maxVis);
    const [suitable, setSuitable] = useState(selectedSite.suitable);

    const [commonFeatures, setCommonFeatures] = useState(selectedSite.commonFeatures);

    console.log(commonFeatures);


    const editDiveSite = () => {
        return fetch('http://localhost:8080/diveSites/editDiveSite/' + selectedSite._id,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                diveSite: {
                    id: selectedSite._id,
                    name: name,
                    area: area,
                    country: country,
                    latitude: latitude,
                    longitude: longitude,
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
            setShowEditModal(false);
            loadDiveSites();
        })
        .catch(err => {
            console.log(err);
        });
    
    }
    
    const handleEditSiteSubmit = (event) => {
        event.preventDefault();
 
        console.log('handleEditSiteSubmit');
        editDiveSite();
    }

    return (
        <div>
            {/* IF showDeleteModal is false then show edit modal */}
            {!showDeleteModal && (
                <div className={classes.form}>
                    <div className={classes.form__headerContainer}>
                        <h3 className={classes.header}>Edit a Dive site</h3>
                    </div>
                    <div className={classes.form__deleteContainer}>
                        <span className={classes.delete} onClick={() => setShowDeleteModal(true)}> Delete this dive site</span>
                    </div>
                    {/* //! HERE */}
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
                  

                    <div className={classes.form__uploadContainer}>
                        <ImageUpload/>
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

                    <div className={classes.form__editBtnContainer}>
                        <input
                                placeholder="Edit"
                                type="submit"
                                onClick={(e) => handleEditSiteSubmit(e)}
                                className={classes.editBtn}/>
                    </div>

                  </div>
            )}

                    
                    
              
            {showDeleteModal && ( 
                <DeleteContainer/>
            )}
             {/* ELSE showDeleteModal is true then show delete modal */}
        </div>
    );
};

export default EditSiteForm;