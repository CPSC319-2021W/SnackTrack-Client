import { ReactComponent as DashboardIcon } from '../assets/icons/dashboard.svg';
import { ReactComponent as InventoryIcon } from '../assets/icons/box.svg';
import { ReactComponent as LogoutIcon } from '../assets/icons/logout.svg';
import { ROUTES } from '../constants';
import { React } from 'react';
import { ReactComponent as UserGroupIcon } from '../assets/icons/usergroup.svg';
import classNames from 'classnames';
import iconStyles from '../styles/HeaderBar.module.css';
import styles from '../styles/BottomNavigation.module.css';
import { useHistory } from 'react-router-dom';

const BottomNavigationAdmin = (props) => {
  const { handleLogOut } = props;
  const history = useHistory();
  const { pathname } = history.location;

  return (
    <div className={styles.bottomNav__base}>
      <button
        className={iconStyles.icon__container}
        onClick={() => history.push(ROUTES.DASHBOARD)}
      >
        <DashboardIcon
          className={classNames({
            [iconStyles.unselectable]: true,
            [styles.icon__base]: true,
            [styles.icon__active]: pathname === ROUTES.DASHBOARD
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
            [styles.icon__active]: pathname.includes(ROUTES.USERS)
          })}
        />
      </button>
      <button className={iconStyles.icon__container} onClick={() => handleLogOut()}>
        <LogoutIcon
          className={classNames({
            [iconStyles.unselectable]: true,
            [styles.icon__base]: true
          })}
        />
      </button>
    </div>
  );
};

export default BottomNavigationAdmin;
