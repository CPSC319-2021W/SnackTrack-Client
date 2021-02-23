import { Button, Card, CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';

import { ReactComponent as Logo } from '../assets/galvanize.svg';
import { authenticate } from '../services/UsersService';
import { refreshTokenSetup } from '../helpers/AuthHelper';
import { setUser } from '../redux/features/users/usersSlice';
import styles from '../styles/Login.module.css';
import { useDispatch } from 'react-redux';
import { useGoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';

const AuthLogin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const setProfile = (profile) => dispatch(setUser(profile));

  const onSuccess = async (googleUser) => {
    setIsLoading(true);
    const token = googleUser.getAuthResponse().id_token;
    const userResponse = await authenticate(token);
    setProfile(userResponse);
    refreshTokenSetup(googleUser);
    history.push('/snacks');
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

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Card className={styles.card}>
          <div className={styles.logo__container}>
            <Logo width={'100px'}/>
          </div>
          <h2 className={styles.title}>SnackTrack</h2>
          <Button className={styles.button__login} variant='outlined' onClick={handleLogIn}>
            {isLoading ? (
              <CircularProgress size={30} thickness={5} />
            ) : (
              'Log in with Google'
            )}
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default AuthLogin;
