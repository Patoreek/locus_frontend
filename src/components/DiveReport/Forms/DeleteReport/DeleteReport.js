import React, {useState, useEffect} from 'react';
import classes from './DeleteReport.module.scss';
import { format } from 'date-fns';


const DeleteReport = (props) => {

    const [name, setName] = useState();
    const [area, setArea] = useState();
    const [country, setCountry] = useState();
    const [date, setDate] = useState();
    const [reportId, setReportId] = useState();



    useEffect(() => {

        let convertedDate = new Date(props.currentReport.createdAt);
        convertedDate = format(convertedDate, 'dd/MM/yyyy');

        setName(props.currentReport.siteId.name);
        setArea(props.currentReport.siteId.area);
        setCountry(props.currentReport.siteId.country);
        setDate(convertedDate);
        setReportId(props.currentReport._id);

    }, []);

    const cancelHandler = () => {
        props.setShowDelete(false);
    }

    const deleteHandler = () => {
        return fetch('http://localhost:8080/user/diveReports/deleteReport',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                    reportId: reportId,
            })
            })
            .then(res => {
                return res.json();   
            })
            .then(result => {
                console.log(result);
                    if (!result.success) {
                        //errorMessage.push(result.message);
                        //setIsError(true);
                    } else {
                        // setSuccess(true);
                        // setTimeout(() => {
                        //     history.push('/profile');
                        //   }, 1500);
                    }
            })
            .catch(err => {
                console.log(err);
                //setSuccess('false');

            });
    }


    return (
        <div className={classes.deleteContainer}>
            <span className={classes.deleteContainer__areYouSure}> Are you sure you want to delete your report at</span>
            <span className={classes.deleteContainer__location}>{name}, {area}, {country}</span>
            <span className={classes.deleteContainer__on}> on</span>
            <span className={classes.deleteContainer__date}> {date}</span>
            <div className={classes.deleteContainer__buttonsContainer}>
                <button className={classes.cancel} onClick={cancelHandler}>Cancel</button>
                <button className={classes.delete} onClick={deleteHandler}>Delete</button>
            </div>



        </div>
    );
};

export default DeleteReport;