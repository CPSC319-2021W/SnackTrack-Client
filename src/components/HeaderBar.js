import { AppBar, Button, Menu, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';

import NumberFormat from 'react-number-format';
import classNames from 'classnames';
import profileIcon from '../assets/icons/user.svg';
import snacksIcon from '../assets/icons/utensils.svg';
import styles from '../styles/HeaderBar.module.css';
import transactionsIcon from '../assets/icons/dollar.svg';
import { useSelector } from 'react-redux';
import useStyles from '../styles/HeaderBarStyles';

const HeaderBar = (props) => {
  const classes = useStyles();
  const { balance, firstName, history, handleLogOut, clientid } = props;
  const { isAdmin } = useSelector((state) => state.usersReducer.profile);
  const [onSnacks, setOnSnacks] = useState(history.location.pathname === '/snacks');
  const [onTransactions, setOnTransactions] = useState(
    history.location.pathname === '/transactions'
  );
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const routeToAdmin = () => {
    handleClose();
    history.push('/admin');
  };

  const routeToProfile = () => {
    handleClose();
    history.push('/user-profile');
  };

  const routeToLogOut = () => {
    handleClose();
    handleLogOut();
  };

  return (
    <AppBar className={styles.header}>
      {balance !== null ? (
        <div className={styles.bar}>
          <div>
            <img
              className={classNames({
                [styles.unselectable]: true,
                [styles.icon__base]: true,
                [styles.icon__active]: onSnacks
              })}
              src={snacksIcon}
              alt='snacks'
              onClick={() => {
                setOnTransactions(false);
                setOnSnacks(true);
                history.push('/snacks');
              }}
            />
            <img
              className={classNames({
                [styles.unselectable]: true,
                [styles.icon__base]: true,
                [styles.icon__active]: onTransactions
              })}
              src={transactionsIcon}
              alt='transactions'
              onClick={() => {
                setOnTransactions(true);
                setOnSnacks(false);
                history.push('/transactions');
              }}
            />
          </div>
          <div className={styles.label}>
            <h6 className={styles.label__text}>Total Amount Owed</h6>
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
        </div>
      ) : (
        <div className={styles.bar}>
          <h5 className={styles.greeting}>{`Hi, ${firstName}!`}</h5>
          <Button
            className={styles.button_logout}
            variant='outlined'
            clientid={clientid}
            onClick={handleLogOut}
          >
            LOG OUT
          </Button>
        </div>
      )}
    </AppBar>
  );
};

export default HeaderBar;
