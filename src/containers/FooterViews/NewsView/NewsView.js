import React from 'react';

import classes from './NewsView.module.scss';

const NewsView = () => {
    return (
        <div className={classes.news}>
            <div className={classes.news__header}>
                <h1 className={classes.header}>Locus News</h1>
            </div>
            <div className={classes.news__grid}>
                <div className={classes.newsList}>
                    <div className={classes.listing}>
                        <div className={classes.listing__header}>
                            <h3 className={classes.listingHeader}>Latest News</h3>
                        </div>
                        <div className={classes.listing__date}>
                            <span className={classes.date}>03/05/2020 </span>
                        </div>
                    </div>

                    <div className={classes.listing}>
                        <div className={classes.listing__header}>
                            <h3 className={classes.listingHeader}>Patch 1.04</h3>
                        </div>
                        <div className={classes.listing__date}>
                            <span className={classes.date}>03/05/2020 </span>
                        </div>
                    </div>
                
                </div>




                <div className={classes.newsContent}>
                    <div className={classes.post}>
                        <div className={classes.post__header}>
                            <h3 className={classes.postHeader}> Latest News</h3>
                        </div>
                        <div className={classes.post__date}>
                            <span className={classes.date}>03/05/2020 </span>
                        </div>

                        <div className={classes.post__content}>
                            <p className={classes.content}> The Latest news will appear here regarding updates and improvements 
                                for Locus. Currently at version 1.0 and has currently basic functionalities.
                                This includes able to make an account and add, edit and contribute to distributing
                                dive site information and locations. Basic profiles are available and basic image upload
                                is available. More improvements are planned such as forum and event features for individual
                                dive sites.
                            </p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default NewsView;