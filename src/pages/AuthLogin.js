import { Button, Card } from '@material-ui/core';
import { loginFailure, loginSuccess } from '../helpers/AuthLoginHelper';
import { useDispatch, useSelector } from 'react-redux';

import GalvanizeLogo from '../images/logo/galvanize.svg';
import React from 'react';
import { Redirect } from 'react-router-dom';
import appStyles from '../styles/SnackTrack.module.css';
import { setLoginSuccess } from '../redux/features/auth/authSlice';
import styles from '../styles/AuthLogin.module.css';
import { useGoogleLogin } from 'react-google-login';

const AuthLogin = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.authReducer.profile);
  const authLoginSuccess = (profile) => dispatch(setLoginSuccess({ profile }));

  const onSuccess = (res) => {
    authLoginSuccess(res.profileObj);
    loginSuccess(res);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure: loginFailure,
    clientId: process.env.REACT_APP_CLIENT_ID,
    isSignedIn: true
  });

  return (
    <div>
      {profile?.token ? <Redirect to='/snacks' /> : null}
      <Card className={styles.card}>
        <img className={styles.none} src={GalvanizeLogo} alt='Galvanize Logo' />
        <h2 className={appStyles.SnackTrack}>SnackTrack</h2>
        <Button className={styles.button__login} variant='outlined' onClick={signIn}>
          Log in with Google
        </Button>
      </Card>
    </div>
  );
};

export default AuthLogin;
