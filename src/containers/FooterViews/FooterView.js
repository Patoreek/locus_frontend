import React from 'react';

import classes from './FooterView.module.scss';


import AboutView from './AboutView/AboutView';
import NewsView from './NewsView/NewsView';
import ContactView from './ContactView/ContactView';
import SitemapView from './SitemapView/SitemapView';
import PolicyView from './PolicyView/PolicyView';
import TermsView from './TermsView/TermsView';






const FooterView = (props) => {    
    return (
        <div>
            {props.page == "about" ? <AboutView/> : null}
            {props.page == "news" ? <NewsView/> : null}
            {props.page == "contact" ? <ContactView/> : null}
            {props.page == "sitemap" ? <SitemapView/> : null}
            {props.page == "policy" ? <PolicyView/> : null}
            {props.page == "terms" ? <TermsView/> : null}

        </div>
    );
};

export default FooterView;