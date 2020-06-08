import React from 'react';

import classes from './PolicyView.module.css';


const PolicyView = () => {
    return (
        <div className={classes.policyPage}>
            <div className={classes.policyContainer}>
                <h1> Private Policy</h1>
                <p> Private Policy information </p>
            </div>
        </div>
    );
};

export default PolicyView;