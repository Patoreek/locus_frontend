import React, {useContext} from 'react';

import classes from './AuthDrawer.module.scss';

import { AuthDrawerContext } from '../../context/AuthContext';

import LoginView from '../../containers/LoginView/LoginView';
import SignupView from '../../containers/SignupView/SignupView';
import ForgotPassword from '../../containers/ForgotPassword/ForgotPassword';

import { ReactComponent as CloseSVG } from '../../assets/icons/arrow-left.svg';

const AuthDrawer = () => {
    const [authDrawer, setAuthDrawer] = useContext(AuthDrawerContext);
    

    let attachedClasses = [classes.authDrawer, classes.close];

    if (authDrawer.open) {
      attachedClasses = [classes.authDrawer, classes.open];
    }

    const overlayHandler = () => {
      if (authDrawer.open) {
        setAuthDrawer({
          open: false,
          login: false,
          signup: false,
          forgotPW: false
        });
      }
    }

    return (
        <div>
        <div className={attachedClasses.join(' ')}>
            <CloseSVG className={classes.closeArrow} onClick={() => overlayHandler()}/>
            {authDrawer.login ? <LoginView/> : null}
             {authDrawer.signup ? <SignupView/> : null}
             {authDrawer.forgotPw ? <ForgotPassword/> : null}
        </div>
        <div className={`${classes.overlay} ${authDrawer.open ? classes.show : null}`} onClick={() => overlayHandler()}></div>
        </div>
    );
};

export default AuthDrawer;