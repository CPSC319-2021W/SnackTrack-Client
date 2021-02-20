import { Button, Card } from '@material-ui/core';
import { loginFailure, refreshTokenSetup } from '../helpers/AuthLoginHelper';
import { useDispatch, useSelector } from 'react-redux';

import GalvanizeLogo from '../images/logo/galvanize.svg';
import React from 'react';
import { Redirect } from 'react-router-dom';
import appStyles from '../styles/SnackTrack.module.css';
import { authenticate } from '../services/UserService';
import { setUser } from '../redux/features/users/usersSlice';
import styles from '../styles/Login.module.css';
import { useGoogleLogin } from 'react-google-login';

const AuthLogin = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.usersReducer.profile);
  const setProfile = (profile) => dispatch(setUser(profile));

  const onSuccess = async (googleUser) => {
    const token = googleUser.getAuthResponse().id_token;
    const userResponse = await authenticate(token);
    setProfile(userResponse);
    refreshTokenSetup(googleUser);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure: loginFailure,
    clientId: process.env.REACT_APP_CLIENT_ID,
    isSignedIn: true
  });

  return (
    <div className={styles.container}>
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
