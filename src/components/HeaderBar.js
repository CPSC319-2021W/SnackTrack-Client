import { AppBar, Button, Container, Menu, MenuItem } from '@material-ui/core';
import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NumberFormat from 'react-number-format';
import { ROUTES } from '../constants';
import classNames from 'classnames';
import { getUserById } from '../services/UsersService';
import { isAuthenticated } from '../helpers/AuthHelper';
import jwt from 'jsonwebtoken';
import profileIcon from '../assets/icons/user.svg';
import { setUser } from '../redux/features/users/usersSlice';
import snacksIcon from '../assets/icons/utensils.svg';
import styles from '../styles/HeaderBar.module.css';
import transactionsIcon from '../assets/icons/dollar.svg';
import { useHistory } from 'react-router-dom';
import useStyles from '../styles/HeaderBarStyles';

const HeaderBar = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { balance, firstName, handleLogOut, clientid } = props;
  const { isAdmin } = useSelector((state) => state.usersReducer.profile);
  const [anchorEl, setAnchorEl] = useState(null);
  const setProfile = (profile) => dispatch(setUser(profile));

  const { pathname } = history.location;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const routeToAdmin = () => {
    handleClose();
    history.push(ROUTES.ADMIN);
  };

  const routeToProfile = () => {
    handleClose();
    history.push(ROUTES.PROFILE);
  };

  const routeToLogOut = () => {
    handleClose();
    handleLogOut();
  };

  useEffect(async () => {
    const maxTries = 3;
    let tries = 0;
    // eslint-disable-next-line
    while (true) {
      try {
        const token = isAuthenticated();
        if (token) {
          const decoded = jwt.decode(token);
          decoded.userId = 1; // TODO: Remove once backend implements AUTH
          const { userId } = decoded;
          const user = await getUserById(userId);
          setProfile(user);
        }
      } catch (err) {
        if (++tries === maxTries) {
          history.push(ROUTES.LOGIN);
        }
      }
    }
  }, []);

  return (
    <AppBar className={styles.header}>
      {isAuthenticated() ? (
        <Container className={styles.bar}>
          <div>
            <img
              className={classNames({
                [styles.unselectable]: true,
                [styles.icon__base]: true,
                [styles.icon__active]: pathname === ROUTES.SNACKS
              })}
              src={snacksIcon}
              alt='snacks'
              onClick={() => {
                history.push(ROUTES.SNACKS);
              }}
            />
            <img
              className={classNames({
                [styles.unselectable]: true,
                [styles.icon__base]: true,
                [styles.icon__active]: pathname === ROUTES.TRANSACTIONS
              })}
              src={transactionsIcon}
              alt='transactions'
              onClick={() => {
                history.push(ROUTES.TRANSACTIONS);
              }}
            />
          </div>
          <div className={styles.label}>
            <h6 className={styles.label__text}>Total Amount Owing</h6>
            <h4 className={styles.label__balance}>
              <NumberFormat
                value={balance / 100}
                displayType={'text'}
                decimalScale={2}
                fixedDecimalScale={true}
                prefix={'$'}
              />
            </h4>
          </div>
          <img
            className={classNames({
              [styles.unselectable]: true,
              [styles.icon__base]: true,
              [styles['icon__margin-right']]: true,
              [styles.icon__active]: Boolean(anchorEl)
            })}
            src={profileIcon}
            aria-describedby={anchorEl ? 'simple-popover' : undefined}
            alt='profile'
            onClick={handleClick}
          />
          <Menu
            keepMounted
            className={classes.menu}
            id='user-menu'
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={handleClose}
          >
            {isAdmin ? (
              <MenuItem className={classes.menuItem} onClick={routeToAdmin}>
                ADMIN
              </MenuItem>
            ) : null}
            <MenuItem className={classes.menuItem} onClick={routeToProfile}>
              Profile
            </MenuItem>
            <MenuItem className={classes.menuItem} onClick={routeToLogOut}>
              Log out
            </MenuItem>
          </Menu>
        </Container>
      ) : (
        <Container className={styles.bar}>
          <h5 className={styles.greeting}>{`Hi, ${firstName}!`}</h5>
          <Button
            className={styles.button_logout}
            variant='outlined'
            clientid={clientid}
            onClick={handleLogOut}
          >
            EXIT SESSION
          </Button>
        </Container>
      )}
    </AppBar>
  );
};

export default HeaderBar;
