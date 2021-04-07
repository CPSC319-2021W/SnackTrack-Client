import { AppBar, Container, Tooltip } from '@material-ui/core';
import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as AdminIcon } from '../assets/icons/user_admin.svg';
import { ReactComponent as HomeIcon } from '../assets/icons/home.svg';
import { ReactComponent as LogoutIcon } from '../assets/icons/logout.svg';
import NumberFormat from 'react-number-format';
import { ROUTES } from '../constants';
import { ReactComponent as TransactionsIcon } from '../assets/icons/receipt.svg';
import classNames from 'classnames';
import { getUserById } from '../services/UsersService';
import { isAuthenticated } from '../helpers/AuthHelper';
import jwt from 'jsonwebtoken';
import { setUser } from '../redux/features/users/usersSlice';
import styles from '../styles/HeaderBar.module.css';
import { useHistory } from 'react-router-dom';

const HeaderBar = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { handleLogOut } = props;
  const [hover, setHover] = useState(false);
  const { firstName, lastName, balance, isAdmin, sessionBalance } = useSelector(
    (state) => state.usersReducer.profile
  );
  const setProfile = (profile) => dispatch(setUser(profile));

  const { pathname } = history.location;

  useEffect(async () => {
    try {
      const token = isAuthenticated();
      if (token) {
        const decoded = jwt.decode(token);
        const { user_id } = decoded;
        const user = await getUserById(user_id);
        setProfile(user);
      }
    } catch (err) {
      history.push(ROUTES.LOGIN);
    }
  }, []);

  const renderHeader = () => {
    return isAuthenticated() ? (
      <Container
        className={classNames({
          [styles.bar]: true
        })}
      >
        <div className={styles.menu__container__left}>
          <Tooltip title='Home'>
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
          </Tooltip>
          <Tooltip title='Transactions'>
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
          </Tooltip>
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
          {firstName &&
            (isAdmin ? (
              <Tooltip title='Admin Module'>
                <button
                  className={styles.pill__container}
                  onClick={() => history.push(ROUTES.DASHBOARD)}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >
                  <p
                    className={classNames({
                      [styles.pill__text]: true,
                      [styles.pill__text__hover]: hover
                    })}
                  >
                    {firstName} {lastName?.slice(0, 1)}.
                  </p>
                  <div className={styles.pill__icon}>
                    <AdminIcon
                      className={classNames({
                        [styles.unselectable]: true,
                        [styles.admin__switch__icon]: hover
                      })}
                    />
                  </div>
                </button>
              </Tooltip>
            ) : (
              <button
                className={classNames({
                  [styles.pill__container]: true,
                  [styles.pill__disabled]: true
                })}
              >
                <p
                  className={classNames({
                    [styles.pill__text]: true,
                    [styles.pill__text__emp]: true
                  })}
                >
                  {firstName} {lastName?.slice(0, 1)}.
                </p>
              </button>
            ))}
          <Tooltip title='Log Out'>
            <button
              className={classNames({
                [styles.icon__container]: true,
                [styles.icon__container__logout]: true
              })}
              onClick={() => handleLogOut()}
            >
              <LogoutIcon
                className={classNames({
                  [styles.unselectable]: true,
                  [styles.icon__base]: true
                })}
              />
            </button>
          </Tooltip>
        </div>
      </Container>
    ) : (
      <Container className={styles.bar}>
        <h5 className={styles.greeting}>{`Hi, ${firstName}!`}</h5>
        <div className={styles.label}>
          <h6 className={styles.label__text}>Session Balance</h6>
          <h4 className={styles.label__balance}>
            <NumberFormat
              value={sessionBalance / 100}
              displayType={'text'}
              decimalScale={2}
              fixedDecimalScale={true}
              prefix={'$'}
            />
          </h4>
        </div>
        <Tooltip title='Exit Session'>
          <button className={styles.icon__container} onClick={() => handleLogOut()}>
            <LogoutIcon
              className={classNames({
                [styles.unselectable]: true,
                [styles.icon__base]: true
              })}
            />
          </button>
        </Tooltip>
      </Container>
    );
  };

  return <AppBar className={styles.header}>{renderHeader()}</AppBar>;
};

export default HeaderBar;
