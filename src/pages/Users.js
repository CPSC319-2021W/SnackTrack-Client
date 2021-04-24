import { DEFAULT_SEARCH_THRESHOLD, NOTIFICATIONS } from '../constants';
import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

import {
  setApiResponse,
  setToastNotificationOpen
} from '../redux/features/notifications/notificationsSlice';
import ToastNotification from '../components/ToastNotification';
import UserSearchBar from '../components/UserSearchBar';
import UsersContainerAdmin from '../components/UsersContainerAdmin';
import adminStyles from '../styles/AdminUsersList.module.css';
import { getUsersAdmin } from '../services/UsersService';
import { handleSearch } from '../helpers/SearchHelpers';
import styles from '../styles/Page.module.css';

const Users = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [usersToDisplay, setUsersToDisplay] = useState(users);
  const { usersSearchValue } = useSelector((state) => state.searchbarReducer);
  const { isToastNotificationOpen, apiResponse } = useSelector(
    (state) => state.notificationsReducer
  );

  const searchOptions = {
    keys: ['full_name', 'email_address'],
    threshold: DEFAULT_SEARCH_THRESHOLD
  };

  const openToastNotification = (bool) => dispatch(setToastNotificationOpen(bool));

  const onApiResponse = (response) => dispatch(setApiResponse(response));

  const handleClose = () => {
    openToastNotification(false);
  };

  const handleApiResponse = (response) => {
    onApiResponse(response);
    openToastNotification(true);
  };

  useEffect(async () => {
    try {
      const { users } = await getUsersAdmin();
      users.forEach(user => {
        user.full_name = `${user.first_name} ${user.last_name}`;
      });
      users.sort(compareUsers);
      setUsers(users);
      setIsLoaded(users.length > 0);
    } catch (err) {
      console.log(err);
      handleApiResponse('ERROR');
    }
  }, []);

  useEffect(() => {
    handleSearch(users, usersSearchValue, setUsersToDisplay, searchOptions);
  }, [isLoaded, usersSearchValue]);

  const compareUsers = (a, b) => {
    return compareName(a,b) || compareAdmin(a,b);
  };

  const compareName = (a, b) => {
    return a.full_name.localeCompare(b.full_name);
  };

  const compareAdmin = (a, b) => {
    if (a.is_admin && !b.is_admin) {
      return -1;
    } else if (!a.is_admin && b.is_admin) {
      return 1;
    } else {
      return 0;
    }
  };

  const renderList = () => {
    if (usersToDisplay.length === 0) {
      return <p>{"We couldn't find that user. Please try again."}</p>;
    } else {
      return <UsersContainerAdmin users={usersToDisplay} />;
    }
  };

  return (
    <div className={styles.base}>
      <div className={styles.header__single}>
        <h5 className={styles.title}>Users</h5>
      </div>
      <div className={adminStyles.page__content}>
        <div className={styles.searchbar__container}>
          <UserSearchBar />
        </div>
        {isLoaded ? (
          renderList()
        ) : (
          <div className={adminStyles.list__container}>
            <CircularProgress color='secondary' size={30} thickness={5} />
          </div>
        )}
      </div>
      <ToastNotification
        open={isToastNotificationOpen}
        notification={NOTIFICATIONS[apiResponse]}
        onClose={handleClose}
      />
    </div>
  );
};

export default Users;
