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


    const loadDiveSites = useContext(LoadDiveSiteContext)

    const [siteName, setSiteName] = useState(selectedSite.name);
    const [siteArea, setSiteArea] = useState(selectedSite.area);
    const [siteDescription, setSiteDescription] = useState(selectedSite.description);
    const [siteType, setSiteType] = useState(selectedSite.siteType);
    const [siteDepth, setSiteDepth] = useState(selectedSite.depth);

    const [commonFeatures, setCommonFeatures] = useState(selectedSite.commonFeatures);

    console.log(commonFeatures);


    const editDiveSite = (siteName, siteArea, siteDescription, siteType, siteLatitude, siteLongitude) => {
        return fetch('http://localhost:8080/diveSites/editDiveSite/' + selectedSite._id,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                diveSite: {
                    name: siteName,
                    area: siteArea,
                    latitude: siteLatitude,
                    longitude: siteLongitude,
                    description: siteDescription,
                    siteType: siteType,
                    siteDepth: siteDepth,
                    commonFeatures: commonFeatures
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
        const name = siteName;
        const area = siteArea;
        const description = siteDescription;
        const type = siteType;
        console.log('handleEditSiteSubmit');
        editDiveSite(name, area, description, type);
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
                                value={siteName}
                                onChange={e => setSiteName(e.target.value)} />
                    </div>
                    
                    <div className={classes.form__areaContainer}>
                        <input className={`${classes.input} ${classes.input__area}`}
                                placeholder="Area / Suburb"
                                value={siteArea}
                                onChange={e => setSiteArea(e.target.value)} />
                    </div>

                    <div className={classes.form__uploadContainer}>
                        <ImageUpload/>
                    </div>

                    <div className={classes.form__descriptionContainer}>
                        <textarea className={`${classes.input} ${classes.input__description}`}
                                    rows="10"
                                    value={siteDescription}
                                    placeholder="Description"
                                    onChange={e => setSiteDescription(e.target.value)} />
                    </div>
                  
                    <div className={classes.form__section1}>
                        <div className={classes.accessContainer}>
                            <span className={classes.accessContainer__title}>Access from:</span> {/* Dive Type */}
                            <span className={classes.accessContainer__input}>Shore</span>
                        </div>
                            {/* <input type="radio" 
                                aria-label="shore" 
                                label="Shore Dive" 
                                name="siteType" 
                                value={siteType} 
                                onChange={e => setSiteType("1")}
                                checked={siteType == 1}
                                className={classes.radioButton}
                        />
                        <span>Boat</span>
                        <input type="radio" 
                                aria-label="boat" 
                                label="Boat Dive" 
                                name="siteType" 
                                value={siteType} 
                                onChange={e => setSiteType("2")}
                                checked={siteType == 2}
                                className={classes.radioButton}
                        /> */}
                        <div className={classes.diveTypeContainer}>
                            <span className={classes.diveTypeContainer__title}>Dive Type:</span> {/* NEW Definition of Dive Type */}
                            <span className={classes.diveTypeContainer__input}>Reef</span>
                        </div>

                        <div className={classes.maxDepthContainer}>
                            <span className={classes.maxDepthContainer__title}>Max Depth</span>
                            <input   className={`${classes.input} ${classes.input__maxDepth}`}
                                    placeholder="Max Depth of Site"
                                    value={siteDepth}
                                    onChange={e => setSiteDepth(e.target.value)} />
                        </div>
                        
                        <div className={classes.avgDepthContainer}>
                            <span className={classes.avgDepthContainer__title}>Avg Depth</span>
                            <input   className={`${classes.input} ${classes.input__avgDepth}`}
                                    placeholder="Max Depth of Site"
                                    //value={siteDepth}
                                    //onChange={e => setSiteDepth(e.target.value)} 
                                    />
                        </div>
                        
                    </div>

                    <div className={classes.form__section2}>
                        <div className={classes.temperatureContainer}>
                            <span className={classes.temperatureContainer__title}>Temperature (C)</span>
                                <input className={`${classes.input} ${classes.input__minTemp}`}
                                    placeholder="Average Minimum Temperature"
                                // value={}
                                // onChange={e => setSiteArea(e.target.value)} 
                                />
                                <input className={`${classes.input} ${classes.input__maxTemp}`}
                                    placeholder="Average Maximum Temperature"
                                // value={}
                                // onChange={e => setSiteArea(e.target.value)} 
                                />
                        </div>
                        
                        <div className={classes.visibilityContainer}>
                        <span className={classes.visibilityContainer__title}>Visibility (m)</span>
                            <input className={`${classes.input} ${classes.input__minVis}`}
                                placeholder="Average Minimum Visibility"
                               // value={}
                               // onChange={e => setSiteArea(e.target.value)} 
                            />
                            <input className={`${classes.input} ${classes.input__maxVis}`}
                                placeholder="Average Maximum Visibility"
                               // value={}
                               // onChange={e => setSiteArea(e.target.value)} 
                            />
                        </div>
                    </div>

                    <div className={classes.form__section3}>
                        <span className={classes.header}>Diver Experience</span>
                        <input className={`${classes.input} ${classes.input__experience}`}
                                placeholder="Advanced Open Water Diver"
                               // value={}
                               // onChange={e => setSiteArea(e.target.value)} 
                            />
                    </div>
                
                    <div className={classes.form__commonFeaturesContainer}>
                        <CommonFeatures/>
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