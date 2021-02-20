import { Button, Card } from '@material-ui/core';
import { loginFailure, refreshTokenSetup } from '../helpers/AuthLoginHelper';

import GalvanizeLogo from '../images/logo/galvanize.svg';
import React from 'react';
import appStyles from '../styles/SnackTrack.module.css';
import { authenticate } from '../services/UserService';
import { setUser } from '../redux/features/users/usersSlice';
import styles from '../styles/Login.module.css';
import { useDispatch } from 'react-redux';
import { useGoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';

const AuthLogin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const setProfile = (profile) => dispatch(setUser(profile));

  const onSuccess = async (googleUser) => {
    const token = googleUser.getAuthResponse().id_token;
    const userResponse = await authenticate(token);
    setProfile(userResponse);
    refreshTokenSetup(googleUser);
    history.push('/snacks');
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure: loginFailure,
    clientId: process.env.REACT_APP_CLIENT_ID,
    isSignedIn: true
  });

  return (
    <div className={styles.container}>
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
