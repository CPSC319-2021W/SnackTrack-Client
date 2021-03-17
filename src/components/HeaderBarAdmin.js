import { AppBar, Container, Tooltip } from '@material-ui/core';
import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as DashboardIcon } from '../assets/icons/dashboard.svg';
import { ReactComponent as EmployeeIcon } from '../assets/icons/user_employee.svg';
import { ReactComponent as InventoryIcon } from '../assets/icons/box.svg';
import { ReactComponent as LogoutIcon } from '../assets/icons/logout.svg';
import { ROUTES } from '../constants';
import { ReactComponent as UserGroupIcon } from '../assets/icons/usergroup.svg';
import classNames from 'classnames';
import { getUserById } from '../services/UsersService';
import { isAdmin } from '../helpers/AuthHelper';
import jwt from 'jsonwebtoken';
import { setUser } from '../redux/features/users/usersSlice';
import styles from '../styles/HeaderBar.module.css';
import { useHistory } from 'react-router-dom';

const HeaderBarAdmin = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { handleLogOut } = props;
  const [hover, setHover] = useState(false);
  const { firstName, lastName } = useSelector((state) => state.usersReducer.profile);
  const setProfile = (profile) => dispatch(setUser(profile));

  const { pathname } = history.location;

  useEffect(async () => {
    try {
      const token = isAdmin();
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

  return (
    <AppBar className={styles.header}>
      <Container
        className={classNames({
          [styles.bar]: true,
          [styles.bar__mobile__admin]: true
        })}
      >
        <div className={styles.menu__container__left}>
          <Tooltip title='Dashboard'>
            <button
              className={styles.icon__container}
              onClick={() => history.push(ROUTES.DASHBOARD)}
            >
              <DashboardIcon
                className={classNames({
                  [styles.unselectable]: true,
                  [styles.icon__base]: true,
                  [styles.icon__active]: pathname === ROUTES.DASHBOARD
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
                  [styles.icon__active]: pathname.includes(ROUTES.USERS)
                })}
              />
            </button>
          </Tooltip>
        </div>
        <div className={styles.menu__container__right}>
          {firstName && lastName ? (
            <Tooltip title='Employee Module'>
              <button
                className={styles.pill__container}
                onClick={() => history.push(ROUTES.SNACKS)}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                <p
                  className={classNames({
                    [styles.pill__text]: true,
                    [styles.pill__text__hover]: hover
                  })}
                >
                  {firstName} {lastName.slice(0, 1)}.
                </p>
                <div className={styles.pill__icon}>
                  <EmployeeIcon
                    className={classNames({
                      [styles.unselectable]: true,
                      [styles.admin__switch__icon]: hover
                    })}
                  />
                </div>
              </button>
            </Tooltip>
          ) : null}
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
    </AppBar>
  );
};

export default HeaderBarAdmin;
