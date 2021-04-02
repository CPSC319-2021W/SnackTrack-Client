import React, { useState } from 'react';

import { Button, Card, CircularProgress } from '@material-ui/core';
import Cookies from 'js-cookie';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useGoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';

import { ROUTES } from '../constants';
import { authenticate } from '../services/UsersService';
import { refreshTokenSetup } from '../helpers/AuthHelper';
import { setUser } from '../redux/features/users/usersSlice';
import styles from '../styles/Login.module.css';

import { ReactComponent as GalvanizeLogo } from '../assets/logos/galvanize.svg';
import { ReactComponent as GoogleLogo } from '../assets/logos/google.svg';
import { ReactComponent as SnackTrackLogo } from '../assets/logos/snacktrack_nobg.svg';

const AuthLogin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const setProfile = (profile) => dispatch(setUser(profile));

  const onSuccess = async (googleUser) => {
    setIsLoading(true);
    const token = googleUser.getAuthResponse().id_token;
    const { accessToken, user } = await authenticate(token);
    Cookies.set('auth', accessToken, {
      expires: 30,
      secure: process.env.REACT_APP_ENV !== 'DEV'
    });
    setProfile(user);
    refreshTokenSetup(googleUser);
    history.push(ROUTES.SNACKS);
  };

  const loginFailure = (res) => {
    setIsLoading(false);
    console.log('[Login Failed] currentUser: ', res);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure: loginFailure,
    clientId: process.env.REACT_APP_CLIENT_ID,
    prompt: 'consent',
    isSignedIn: true
  });

  const handleLogIn = () => {
    setIsLoading(true);
    signIn();
  };

  const renderChildren = () => {
    return (
      <>
        <span className={styles.button__icon}><GoogleLogo /></span>
        <span className={styles.button__text}>Log in with Google</span>
      </>
    );
  };


  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Card className={styles.card}>
          <div className={styles.logo__container}>
            <GalvanizeLogo className={styles.g_logo} />
            <SnackTrackLogo className={styles.st_logo} />
          </div>
          <Button
            className={classNames({
              [styles.button__login]: true,
              [styles.button__loading]: isLoading
            })}
            onClick={handleLogIn}
          >
            {isLoading ? (
              <CircularProgress size={30} thickness={5} />
            ) : renderChildren()}
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default AuthLogin;
