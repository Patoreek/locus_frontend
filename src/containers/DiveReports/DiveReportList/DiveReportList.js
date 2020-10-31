import React, {useState, useContext, useEffect} from 'react';
import classes from './DiveReportList.module.scss';
import { format } from 'date-fns';


import { ReactComponent as AddSVG } from '../../../assets/icons/add.svg';
import { ReactComponent as DeleteSVG } from '../../../assets/icons/delete.svg';
import { ReactComponent as EditSVG } from '../../../assets/icons/edit.svg';





const DiveReportList = (props) => {


    const addHandler = () => {
        //console.log('adding a dive report');
        props.setShowEdit(false);
        props.setShowDelete(false);
        props.setShowPreview(false);
        props.setShowAdd(true);
      
    }

    const previewHandler = (id) => {
        // props.setReportId(id);
        props.setShowEdit(false);
        props.setShowDelete(false);
        props.setShowPreview(false);
        props.setShowAdd(false);
        props.findReport(id, 'preview');

        
  
    }

    const editHandler = (id) => {
        props.setShowEdit(false);
        props.setShowDelete(false);
        props.setShowPreview(false);
        props.setShowAdd(false);
        props.findReport(id, 'edit');
    }

    const deleteHandler = (id) => {
        props.setShowEdit(false);
        props.setShowPreview(false);
        props.setShowAdd(false);
        props.setShowDelete(false);
        props.findReport(id, 'delete');
      //  console.log('deleting a dive report');
    
    }

    const dateHandler = (createdAt) => {

        let convertedDate = new Date(createdAt);
        convertedDate = format(convertedDate, 'dd/MM/yyyy');

        return (
            <span className={classes.date}>{convertedDate}</span>
        )
    }


    return (
        <div className={classes.diveReportList}>
            <div className={classes.diveReportList__titleContainer}>
                <h2 className={classes.title}>Dive Reports</h2>
                <AddSVG className={classes.addBtn} onClick={addHandler}/>
            </div>
            
                <div>
                    {props.diveReports.map(report => (
                            <div className={classes.diveReportList__reportContainer}>
                                <div className={classes.locationContainer} onClick={() => previewHandler(report._id)}>
                                    <h3 className={classes.location}>{report.siteId.name}, {report.siteId.area}</h3>
                                </div>
                                <div className={classes.dateContainer} onClick={() => previewHandler(report._id)}>
                                    <span className={classes.date}>{dateHandler(report.createdAt)}</span>
                                </div>
                                
                                <div className={classes.editSVG} onClick={() => editHandler(report._id)}>
                                    <EditSVG className={classes.icon}/>
                                </div>
                                <div className={classes.deleteSVG} onClick={() => deleteHandler(report._id)}>
                                    <DeleteSVG className={classes.icon}/>
                                </div>
                            </div>
                    ))}
                </div>

        </div>
    );
};

export default DiveReportList;