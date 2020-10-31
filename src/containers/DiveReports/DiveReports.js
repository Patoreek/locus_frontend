import React, {useState, useEffect} from 'react';

import classes from './DiveReports.module.scss';

import DiveReportForm from './DiveReportForm/DiveReportForm';
import DiveReportList from './DiveReportList/DiveReportList';
import PreviewReport from './PreviewReport/PreviewReport';
import EditReport from './EditReport/EditReport';
import DeleteReport from './DeleteReport/DeleteReport';





const DiveReports = () => {

    const [diveReports, setDiveReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [reportId, setReportId] = useState();

    const [showPreview, setShowPreview] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [currentReport, setCurrentReport] = useState(null);



    useEffect(() => {
        async function getReports() {
            try {
                const response = await fetch('http://localhost:8080/user/diveReports/getReports',{
                    method: 'GET',
                    credentials: 'include',
                });
                const reports = await response.json();
                console.log(reports);
                setDiveReports(reports.reportsData);
                setIsLoading(false);
                // setDiveSites(sites.site);
                // setIsLoading(false);
            } catch (error) {
            console.log(error);
            //setIsLoading(null);
            }
        }
      
        getReports();

    }, []);

    const findReport = (id, handlerType) => {
        return fetch('http://localhost:8080/user/diveReports/findReport',{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                reportId: id,
        
            })
        })
        .then(res => {
            return res.json();
        })
        .then(resData => {
            console.log(resData);
            setCurrentReport(resData.report);

            if (handlerType == "preview"){
                setShowPreview(true);
            } else if (handlerType == "edit") {
                setShowEdit(true);
            } else if (handlerType == "delete") {
                setShowDelete(true);
            }



        })
        .catch(err => {
            console.log('Caught.');
            console.log(err);
            // setErrMsg('Error. Please Try again.');
            // setSuccessMsg(null);
            // history.push("/login");
        });
    
    }


    // useEffect(() => {
    //     if (currentReport != null){
    //         if ()
    //         setShowPreview(true);
    //     }
    // }, [currentReport])

    return (
        <div className={classes.diveReports}>
          
            <div className={classes.diveReports__left}>
                {!isLoading && (
                    <DiveReportList diveReports={diveReports} 
                                    setReportId={setReportId}
                                    setShowPreview={setShowPreview} 
                                    setShowAdd={setShowAdd} 
                                    setShowEdit={setShowEdit} 
                                    setShowDelete={setShowDelete}
                                    findReport={findReport}
                    />
                )}
            </div>
            <div className={classes.diveReports__right}>
                {/* <div>
                   Dive Reports Main screen... 
                </div> */}
            {!isLoading && showAdd && (
                <DiveReportForm setShowAdd={setShowAdd}/>
            )}
             {!isLoading && showEdit && (
                <EditReport currentReport={currentReport} setShowEdit={setShowEdit}/>
            )}
            {!isLoading && showPreview && (
                <PreviewReport currentReport={currentReport} setShowPreview={setShowPreview}/>
            )}
             {!isLoading && showDelete && (
                <DeleteReport currentReport={currentReport} setShowDelete={setShowDelete}/>
            )}
                {/* <DiveReportForm/> */}



            </div>
        </div>
    );
};

export default DiveReports;