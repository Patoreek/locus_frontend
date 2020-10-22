import React, {useState} from 'react';
import classes from './ChangePassword.module.scss';

import { useHistory } from 'react-router-dom';

const ChangePassword = () => {

    let history = useHistory();

    const [password, setPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [newPassword2, setNewPassword2] = useState();

    const [errMsg, setErrMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    const cancelHandler = () => {
        history.push('/profile');
    }

    const changePassword = () => {
        // console.log(password);
        // console.log(newPassword);
        // console.log(newPassword);


        console.log('changing password....');
        return fetch('http://localhost:8080/user/changePassword',{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: password,
                newPassword: newPassword,
                newPassword2: newPassword2
            })
        })
        .then(res => {
            return res.json();
        })
        .then(resData => {
            console.log(resData);
            if (resData.success) {
                setErrMsg(null);
                setSuccessMsg(resData.message);
            }
            
        })
        .catch(err => {
            console.log('Caught.');
            console.log(err);
            setErrMsg('Error. Please Try again.');
            setSuccessMsg(null);
            // history.push("/login");
        });
    }

    const changeHandler = () => {
        console.log('change handler activated!');

        if (password == null || newPassword == null || newPassword2 == null) {
            setErrMsg('All fields are required.');
        }
        if (newPassword != newPassword2) {
            setErrMsg('Passwords do not match. Please try again.');
        }
        if (newPassword === newPassword2 && password !== null) {
            changePassword();
        }


       
    }


    return (
        <div className={classes.changePassword}>

            <div className={classes.container}>
                <h3 className={classes.header}> Change Password</h3>
                    <div className={classes.grid}>
                        <div className={classes.grid__input1}>
                            <span>Enter Password</span>
                            <input type="password" className={classes.input} onChange={e => setPassword(e.target.value)}/>
                        </div>
                    
                        <div className={classes.grid__input2}>
                            <span>Enter New Password</span>
                            <input type="password" className={classes.input} onChange={e => setNewPassword(e.target.value)}/>
                        </div>
                        
                        <div className={classes.grid__input3}>
                            <span>Enter New Password Again</span>
                            <input type="password" className={classes.input} onChange={e => setNewPassword2(e.target.value)}/>
                        </div>
                    
                        <div className={classes.grid__cancel}>
                            <button className={classes.cancel} onClick={cancelHandler}> Cancel </button>
                        </div>
                        <div className={classes.grid__change}>
                        <button className={classes.change} onClick={changeHandler}> Change </button>
                        </div>
                        <div className={classes.grid__messages}>
                            {errMsg !== null ? <span className={classes.error}> {errMsg} </span> : null }
                            {successMsg !== null ? <span className={classes.success}> {successMsg} </span> : null }
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default ChangePassword;