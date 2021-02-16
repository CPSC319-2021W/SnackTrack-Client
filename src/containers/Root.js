import '../styles/Global.css';
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../styles/theme';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AuthLogin from '../pages/AuthLogin';
import HeaderBar from '../components/HeaderBar';
import Landing from '../pages/LandingPage';
import React from 'react';
import SelectLogin from '../pages/SelectLogin';
import Snacks from '../pages/Snacks';
import TransactionHistory from '../pages/TransactionHistory';
import UserProfile from '../pages/UserProfile';
import { getUser } from '../redux/features/users/usersSlice';
import { setToken } from '../redux/features/auth/authSlice';

const Root = () => {
  const dispatch = useDispatch();
  const { username, firstName, emailAddress, balance } = useSelector(
    (state) => state.usersReducer
  );
  const token = useSelector((state) => state.authReducer.token);

  const authSetToken = (token) => dispatch(setToken({ token }));
  const getUserById = (userId) => dispatch(getUser(userId));

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='root-container'>
          <HeaderBar balance={balance} firstName={firstName} />
          <Router>
            <Switch>
              <Route path='/auth-login' component={AuthLogin} />
              <Route path='/select-login' component={SelectLogin} />
              <Route path='/snacks' component={Snacks} />
              <Route path='/transaction-history' component={TransactionHistory} />
              <Route path='/user-profile' component={UserProfile} />
              <Route exact path='/' component={Landing} />
            </Switch>
          </Router>
          <h4>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam feugiat turpis ex, vitae vulputate leo aliquet vitae. Nullam vel nisi et erat congue auctor vitae eget quam. Duis sodales metus nec enim pretium, id ullamcorper orci lobortis. Mauris quis arcu ac ex mattis vestibulum sed ac arcu. Nullam venenatis, velit in faucibus eleifend, mauris orci luctus magna, quis consequat nibh sem eget lectus. Nunc sagittis ipsum et velit ullamcorper congue. Morbi sed pulvinar velit. Fusce ac porttitor erat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse id erat at sapien commodo suscipit et et massa. Sed mauris odio, varius et porttitor sit amet, vehicula sed enim. Vivamus non consectetur enim, vitae gravida lacus. Donec sit amet dignissim tellus, nec blandit metus. Maecenas eget leo neque.
            Nunc tortor orci, suscipit sit amet volutpat sed, semper vitae turpis. Ut venenatis elit diam, sed fermentum urna interdum sed. Nunc at porttitor nisi. Duis sodales volutpat lorem eu porttitor. Fusce at turpis turpis. Donec lacus ex, iaculis non pharetra quis, aliquam vel enim. Morbi non convallis dui. Aliquam sed facilisis urna.
            Nullam lacinia ex at sapien aliquet, at tempus orci tempor. Morbi ut urna eget augue ornare facilisis ac id erat. Cras ultricies ipsum nec gravida egestas. Sed malesuada libero nulla, sed faucibus lacus placerat accumsan. Integer scelerisque nunc ac magna feugiat, sed aliquam lacus ultrices. Quisque nec libero ac turpis euismod consequat mollis eget est. Suspendisse potenti. Vestibulum ullamcorper vitae nibh nec rutrum. Praesent et felis et elit rhoncus viverra in ut justo. Pellentesque ultrices fermentum libero in dictum. In at nunc nisi. Vestibulum commodo magna eu augue volutpat aliquam. Duis sed orci eget nisl mattis venenatis vitae id sapien. Nam nisi mi, sagittis auctor convallis sed, porta nec massa. Donec dictum arcu ut dolor molestie, cursus volutpat mauris auctor. Aenean ac tempor tellus.
            Fusce feugiat semper leo. Vestibulum at odio eu odio tincidunt posuere ac eget lorem. Suspendisse at lacinia tellus. Aenean blandit vulputate posuere. Curabitur ut metus non massa vehicula pretium vitae vitae odio. Integer eu euismod felis. Donec tempor nisl auctor fermentum tincidunt. Etiam sed aliquet est. Nam porta tristique diam mattis ornare. Maecenas venenatis est ante. Nunc nunc nulla, pulvinar ut fermentum ac, scelerisque a dui.
            Donec sagittis dui ac lectus dictum varius. Maecenas volutpat posuere porttitor. Integer eget ornare nunc, a consectetur felis. Morbi sodales ultrices efficitur. Vivamus eleifend turpis id massa blandit, ac varius urna ornare. Morbi ut nibh urna. Donec nunc est, gravida quis sagittis vitae, ullamcorper eu lectus. Nulla bibendum libero et eleifend volutpat. Nullam sit amet condimentum felis.
          </h4>
          <div>Token: {token}</div>
          <div>
            {username
              ? `Welcome, ${emailAddress}. You're currently carrying a balance of $${balance}.`
              : ''}
          </div>
          <Button
            variant={'contained'}
            color={'primary'}
            onClick={() => authSetToken('fake_token')}>
            Set Token
          </Button>
          <Button
            variant={'outlined'}
            color={'secondary'}
            onClick={() => getUserById(2)}>
            Set Profile
          </Button>
        </div>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default Root;
