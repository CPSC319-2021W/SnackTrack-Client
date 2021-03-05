import { AppBar, Button, Container } from '@material-ui/core';
import { React, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import NumberFormat from 'react-number-format';
import { ROUTES } from '../constants';
import classNames from 'classnames';
import { getUserById } from '../services/UsersService';
import { isAuthenticated } from '../helpers/AuthHelper';
import jwt from 'jsonwebtoken';
import { setUser } from '../redux/features/users/usersSlice';
import styles from '../styles/HeaderBar.module.css';
import { useHistory } from 'react-router-dom';

import { ReactComponent as AdminIcon } from '../assets/icons/user_admin.svg';
import { ReactComponent as EmployeeIcon } from '../assets/icons/user_employee.svg';
import { ReactComponent as HomeIcon } from '../assets/icons/home.svg';
import { ReactComponent as LogoutIcon } from '../assets/icons/logout.svg';
import { ReactComponent as TransactionsIcon } from '../assets/icons/receipt.svg';

const HeaderBar = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAdminRoute, balance, firstName, handleLogOut, clientid } = props;
  // const { isAdmin } = useSelector((state) => state.usersReducer.profile);
  const setProfile = (profile) => dispatch(setUser(profile));

  const { pathname } = history.location;

  useEffect(async () => {
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
      history.push(ROUTES.LOGIN);
    }
  }, []);

  return (
    <AppBar className={styles.header}>
      {isAuthenticated() ? (
        <Container className={styles.bar}>
          <div className={styles.menu__container__left}>
            <button
              className={styles.icon__container}
              onClick={() => history.push(ROUTES.SNACKS)}
            >
              <HomeIcon
                className={classNames({
                  [styles.unselectable]: true,
                  [styles.icon__base]: true,
                  [styles.icon__active]: pathname === ROUTES.SNACKS
                })}
              />
            </button>
            <button
              className={styles.icon__container}
              onClick={() => history.push(ROUTES.TRANSACTIONS)}
            >
              <TransactionsIcon
                className={classNames({
                  [styles.unselectable]: true,
                  [styles.icon__base]: true,
                  [styles.icon__active]: pathname === ROUTES.TRANSACTIONS
                })}
              />
            </button>
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
          <div className={styles.menu__container__right}>
            {
              true ? (
                isAdminRoute ? (
                  <button
                    className={styles.icon__container}
                    onClick={() => history.push(ROUTES.SNACKS)}
                  >
                    <EmployeeIcon
                      className={classNames({
                        [styles.unselectable]: true,
                        [styles.icon__base]: true
                      })}
                    />
                  </button>
                ) : (
                  <button
                    className={styles.icon__container}
                    onClick={() => history.push(ROUTES.ADMIN)}
                  >
                    <AdminIcon
                      className={classNames({
                        [styles.unselectable]: true,
                        [styles.icon__base]: true
                      })}
                    />
                  </button>
                )
              ) : null
            }
            <button
              className={styles.icon__container}
              onClick={() => handleLogOut()}
            >
              <LogoutIcon
                className={classNames({
                  [styles.unselectable]: true,
                  [styles.icon__base]: true
                })}
              />
            </button>
          </div>
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
