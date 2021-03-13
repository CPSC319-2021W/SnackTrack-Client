import { AppBar, Container, Tooltip } from '@material-ui/core';
import { Fragment, React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
import { ReactComponent as DashboardIcon } from '../assets/icons/dashboard.svg';
import { ReactComponent as EmployeeIcon } from '../assets/icons/user_employee.svg';
import { ReactComponent as HomeIcon } from '../assets/icons/home.svg';
import { ReactComponent as InventoryIcon } from '../assets/icons/box.svg';
import { ReactComponent as LogoutIcon } from '../assets/icons/logout.svg';
import { ReactComponent as TransactionsIcon } from '../assets/icons/receipt.svg';
import { ReactComponent as UserGroupIcon } from '../assets/icons/usergroup.svg';

const HeaderBar = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAdminRoute, balance, firstName, lastName, handleLogOut } = props;
  const { isAdmin } = useSelector((state) => state.usersReducer.profile);
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

  const [hover, setHover] = useState(false);

  const renderEmployeeMenu = () => {
    return (
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
    );
  };

  const renderAdminMenu = () => {
    return (
      <div className={styles.menu__container__left}>
        <Tooltip title='Dashboard'>
          <button
            className={styles.icon__container}
            onClick={() => history.push(ROUTES.ADMIN)}
          >
            <DashboardIcon
              className={classNames({
                [styles.unselectable]: true,
                [styles.icon__base]: true,
                [styles.icon__active]: pathname === ROUTES.ADMIN
              })}
            />
          </button>
        </Tooltip>
        <Tooltip title='Inventory'>
          <button
            className={styles.icon__container}
            onClick={() => history.push(ROUTES.INVENTORY)}
          >
            <InventoryIcon
              className={classNames({
                [styles.unselectable]: true,
                [styles.icon__base]: true,
                [styles.icon__active]: pathname === ROUTES.INVENTORY
              })}
            />
          </button>
        </Tooltip>
        <Tooltip title='Users'>
          <button
            className={styles.icon__container}
            onClick={() => history.push(ROUTES.USERS)}
          >
            <UserGroupIcon
              className={classNames({
                [styles.unselectable]: true,
                [styles.icon__base]: true,
                [styles.icon__active]: pathname === ROUTES.USERS
              })}
            />
          </button>
        </Tooltip>
      </div>
    );
  };

  return (
    <AppBar className={styles.header}>
      {isAuthenticated() ? (
        <Container className={classNames({
          [styles.bar]: true,
          [styles.bar__mobile__admin]: isAdmin && isAdminRoute
        })}>
          <Fragment>
            { isAdmin && isAdminRoute
              ? renderAdminMenu()
              : (
                <Fragment>
                  { renderEmployeeMenu() }
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
                </Fragment>
              )
            }
          </Fragment>
          <div className={styles.menu__container__right}>
            {
              firstName && (isAdmin ? (
                <Tooltip title={isAdminRoute ? 'Employee Module' : 'Admin Module'}>
                  <button
                    className={styles.pill__container}
                    onClick={() => history.push(isAdminRoute ? ROUTES.SNACKS : ROUTES.ADMIN)}
                    onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
                  >
                    <p className={classNames({
                      [styles.pill__text]: true,
                      [styles.pill__text__hover]: hover
                    })}>
                      { firstName } { lastName?.slice(0, 1) }.
                    </p>
                    <div className={styles.pill__icon} >
                      {
                        isAdminRoute ? (
                          <EmployeeIcon className={classNames({
                            [styles.unselectable]: true,
                            [styles.admin__switch__icon]: hover
                          })} />
                        ) : (
                          <AdminIcon className={classNames({
                            [styles.unselectable]: true,
                            [styles.admin__switch__icon]: hover
                          })} />
                        )
                      }
                    </div>
                  </button>
                </Tooltip>
              ) : (
                <button className={classNames({
                  [styles.pill__container]: true,
                  [styles.pill__disabled]: true
                })}>
                  <p className={classNames({
                    [styles.pill__text]: true,
                    [styles.pill__text__emp]: true
                  })}>
                    { firstName } { lastName?.slice(0, 1) }.
                  </p>
                </button>
              ))
            }
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
          <Tooltip title='Exit Session'>
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
          </Tooltip>
        </Container>
      )}
    </AppBar>
  );
};

export default HeaderBar;
