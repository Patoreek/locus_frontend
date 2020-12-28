import React from 'react';

import classes from './PolicyView.module.scss';


const PolicyView = () => {
    return (
        <div className={classes.policy}>
            <div className={classes.policy__header}>
                <h1 className={classes.mainHeader}> Locus Private Policy</h1>
            </div>
            <div className={classes.policy__terms}>
                <h3 className={classes.header}> Terms </h3>
                <p className={classes.paragraph}>
                    Locus (the “Company”) is committed to maintaining robust privacy 
                    protections for its users. Our Privacy Policy (“Privacy Policy”) is 
                    designed to help you understand how we collect, use and safeguard the 
                    information you provide to us and to assist you in making informed 
                    decisions when using our Service.
                    For purposes of this Agreement, “Service” refers to the Company’s service
                    which can be accessed via our website at Locus.com [or through our 
                    mobile application]. in which users can create user accounts and create
                    and contribute to adding diving information. The terms “we,” “us,”
                    and “our” refer to the Company. “You” refers to you, as a user of 
                    Service. By accepting our Privacy Policy and Terms of Service,
                    you consent to our collection, storage, use and disclosure of your 
                    personal information as described in this Privacy Policy.
                </p>
            </div>
            <hr/>
            <div className={classes.policy__collect}>
                <h3 className={classes.header}>Information we collect</h3>
                <p className={classes.paragraph}>We collect “Non-Personal Information” and “Personal Information.” Non-Personal 
                    Information includes information that cannot be used to personally identify you,
                    such as anonymous usage data, general demographic information we may collect, 
                    referring/exit pages and URLs, platform types, preferences you submit and 
                    preferences that are generated based on the data you submit and number of clicks. 
                    Personal Information includes only your email, which you submit to us through the 
                    registration process at the Site.
                    1. Information collected via Technology
                    To activate the Service you do not need to submit any Personal Information other 
                    than your email address. To use the Service thereafter, you do not need to submit
                    further Personal Information. However, in an effort to improve the quality of the 
                    Service, we track information provided to us by your browser or by our software
                    application when you view or use the Service, such as the website you came from 
                    (known as the “referring URL”), the type of browser you use, the device from which
                    you connected to the Service, the time and date of access, and other information 
                    that does not personally identify you. We track this information using cookies, 
                    or small text files which include an anonymous unique identifier. Cookies are 
                    sent to a user’s browser from our servers and are stored on the user’s computer 
                    hard drive. Sending a cookie to a user’s browser enables us to collect
                    Non-Personal information about that user and keep a record of the user’s
                    preferences when utilizing our services, both on an individual and aggregate 
                    basis. For example, the Company may use cookies to collect the following 
                    information:
                    The Company may use both persistent and session cookies; persistent cookies 
                    remain on your computer after you close your session and until you delete them, 
                    while session cookies expire when you close your browser.
                    2. Information you provide us by registering for an account
                    In addition to the information provided automatically by your browser when you
                     visit the Site, to become a subscriber to the Service you will need to create a 
                     personal profile. You can create a profile by registering with the Service and 
                     entering your email address, and creating a user name and a password. By 
                     registering, you are authorizing us to collect, store and use your email address
                      in accordance with this Privacy Policy.
                </p>
            </div>
            <hr/>
            <div className={classes.policy__share}>
                <h3 className={classes.header}>How we use and share infomration </h3>
                <p className={classes.paragraph}>
                Personal Information:                   
                Except as otherwise stated in this Privacy Policy, we do not sell, trade,
                rent or otherwise share for marketing purposes your Personal Information 
                with third parties without your consent. We do share Personal Information with 
                vendors who are performing services for the Company, such as the servers for 
                our email communications who are provided access to user’s email address for
                purposes of sending emails from us. Those vendors use your Personal Information
                only at our direction and in accordance with our Privacy Policy.

                Otherwise, we only use the personal information, in this case the email address,
                to inform users in case of any major updates or issues to the service.

                Non-Personal Information

                In general, we use Non-Personal Information to help us improve the Service 
                and customize the user experience. We also aggregate Non-Personal Information 
                in order to track trends and analyze use patterns on the Site. This Privacy 
                Policy does not limit in any way our use or disclosure of Non-Personal 
                Information and we reserve the right to use and disclose such Non-Personal 
                Information to our partners, advertisers and other third parties at our discretion.

                In the event we undergo a business transaction such as a merger, acquisition
                by another company, or sale of all or a portion of our assets, your Personal 
                Information may be among the assets transferred. You acknowledge and consent
                that such transfers may occur and are permitted by this Privacy Policy, and
                that any acquirer of our assets may continue to process your Personal Information
                as set forth in this Privacy Policy. If our information practices change at any time 
                in the future, we will post the policy changes to the Site so that you may opt out of
                the new information practices. We suggest that you check the Site periodically if you
                are concerned about how your information is used.
                </p>
            </div>
            <hr/>
            <div className={classes.policy__protect}>
                <h3 className={classes.header}>How we protect information</h3>
                <p className={classes.paragraph}>
                We implement security measures designed to protect your information from unauthorized 
                access. Your account is protected by your account password and we urge you to take steps 
                to keep your personal information safe by not disclosing your password and by logging out
                of your account after each use. We further protect your information from potential 
                security breaches by implementing certain technological security measures including 
                encryption, firewalls and secure socket layer technology. However, these measures do not
                guarantee that your information will not be accessed, disclosed, altered or destroyed by 
                breach of such firewalls and secure server software. By using our Service, you acknowledge
                that you understand and agree to assume these risks.  
                </p>
            </div>
                <hr/>
            <div className={classes.policy__rights}>
                <h3 className={classes.header}> Your Rights regarding the use of your personal information </h3>
                <p className={classes.paragraph}>
                    You have the right at any time to prevent us from contacting you for 
                    marketing purposes. When we send a promotional communication to a user, 
                    the user can opt out of further promotional communications by following 
                    the unsubscribe instructions provided in each promotional e-mail. You 
                    can also indicate that you do not wish to receive marketing communications 
                    from us in the “Settings” section of the Site. Please note that 
                    notwithstanding the promotional preferences you indicate by either 
                    unsubscribing or opting out in the Settings section of the Site, we may 
                    continue to send you administrative emails including, for example, periodic 
                    updates to our Privacy Policy.      
                </p>
            </div>
            <hr/>
            <div className={classes.policy__websites}>
                <h3 className={classes.header}> Links to other websites</h3>
                <p className={classes.paragraph}>
                As part of the Service, we may provide links to or compatibility with other
                websites or applications. However, we are not responsible for the privacy
                practices employed by those websites or the information or content they 
                contain. This Privacy Policy applies solely to information collected by us 
                through the Site and the Service. Therefore, this Privacy Policy does not 
                apply to your use of a third party website accessed by selecting a link on 
                our Site or via our Service. To the extent that you access or use the Service
                through or on another website or application, then the privacy policy of that
                other website or application will apply to your access or use of that site or 
                application. We encourage our users to read the privacy statements of other
                websites before proceeding to use them.
                </p>
            </div>
            <hr/>
            <div className={classes.policy__changes}>
                <h3 className={classes.header}> Changes to our privacy policy </h3>
                <p className={classes.paragraph}>
                The Company reserves the right to change this policy and our Terms of Service
                at any time. We will notify you of significant changes to our Privacy Policy
                by sending a notice to the primary email address specified in your account or
                by placing a prominent notice on our site. Significant changes will go into 
                effect 30 days following such notification. Non-material changes or clarifications
                will take effect immediately. You should periodically check the Site and this privacy
                page for updates.   
                </p>
            </div>
            <hr/>
            <div className={classes.policy__contact}>
                <h3 className={classes.header}> Contact us </h3>
                <p className={classes.paragraph}>
                    If you have any questions regarding this Privacy Policy or the practices
                    of this Site, please contact us by sending an email to locus@gmail.com
                </p>
            </div>
            <hr/>
            <div className={classes.policy__update}> 
                <p className={classes.paragraph}>Last Updated: This Privacy Policy was last updated on 01/05/2020</p>
            </div>
        </div>
    );
};

export default PolicyView;