import { Fragment, React } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import iconStyles from '../styles/HeaderBar.module.css';
import styles from '../styles/BottomNavigation.module.css';

import { ROUTES } from '../constants';
import { isAuthenticated } from '../helpers/AuthHelper';

import { useHistory } from 'react-router-dom';

import { ReactComponent as DashboardIcon } from '../assets/icons/dashboard.svg';
import { ReactComponent as HomeIcon } from '../assets/icons/home.svg';
import { ReactComponent as InventoryIcon } from '../assets/icons/box.svg';
import { ReactComponent as LogoutIcon } from '../assets/icons/logout.svg';
import { ReactComponent as TransactionsIcon } from '../assets/icons/receipt.svg';
import { ReactComponent as UserGroupIcon } from '../assets/icons/usergroup.svg';

const BottomNavigation = (props) => {
  const { isAdminRoute, handleLogOut } = props;
  const history = useHistory();
  const { pathname } = history.location;

  const { isAdmin } = useSelector((state) => state.usersReducer.profile);

  return (
    <div className={styles.bottomNav__base}>
      {
        isAuthenticated() ? (
          <Fragment>
            {
              isAdmin && isAdminRoute ? (
                <Fragment>
                  <button
                    className={iconStyles.icon__container}
                    onClick={() => history.push(ROUTES.ADMIN)}
                  >
                    <DashboardIcon
                      className={classNames({
                        [iconStyles.unselectable]: true,
                        [styles.icon__base]: true,
                        [styles.icon__active]: pathname === ROUTES.ADMIN
                      })}
                    />
                  </button>
                  <button
                    className={iconStyles.icon__container}
                    onClick={() => history.push(ROUTES.INVENTORY)}
                  >
                    <InventoryIcon
                      className={classNames({
                        [iconStyles.unselectable]: true,
                        [styles.icon__base]: true,
                        [styles.icon__active]: pathname === ROUTES.INVENTORY
                      })}
                    />
                  </button>
                  <button
                    className={iconStyles.icon__container}
                    onClick={() => history.push(ROUTES.USERS)}
                  >
                    <UserGroupIcon
                      className={classNames({
                        [iconStyles.unselectable]: true,
                        [styles.icon__base]: true,
                        [styles.icon__active]: pathname === ROUTES.USERS
                      })}
                    />
                  </button>
                </Fragment>
              ) : (
                <Fragment>
                  <button
                    className={iconStyles.icon__container}
                    onClick={() => history.push(ROUTES.SNACKS)}
                  >
                    <HomeIcon
                      className={classNames({
                        [iconStyles.unselectable]: true,
                        [styles.icon__base]: true,
                        [styles.icon__active]: pathname === ROUTES.SNACKS
                      })}
                    />
                  </button>
                  <button
                    className={iconStyles.icon__container}
                    onClick={() => history.push(ROUTES.TRANSACTIONS)}
                  >
                    <TransactionsIcon
                      className={classNames({
                        [iconStyles.unselectable]: true,
                        [styles.icon__base]: true,
                        [styles.icon__active]: pathname === ROUTES.TRANSACTIONS
                      })}
                    />
                  </button>
                </Fragment>
              )
            }
            <button
              className={iconStyles.icon__container}
              onClick={() => handleLogOut()}
            >
              <LogoutIcon
                className={classNames({
                  [iconStyles.unselectable]: true,
                  [styles.icon__base]: true
                })}
              />
            </button>
          </Fragment>
        ) : null
      }
    </div>
  );
};

export default BottomNavigation;
