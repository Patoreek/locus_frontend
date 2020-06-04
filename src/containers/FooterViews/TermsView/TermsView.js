import React from 'react';

import classes from './TermsView.module.css';


const TermsView = () => {
    return (
        <div className={classes.termsPage}>
            <div className={classes.termsContainer}>
                <h1> Terms</h1>
                <p> Terms of Service information </p>
            </div>
        </div>
    );
};

export default TermsView;