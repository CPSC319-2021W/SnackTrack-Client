import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

import {
  setApiResponse,
  setToastNotificationOpen
} from '../redux/features/notifications/notificationsSlice';
import { NOTIFICATIONS } from '../constants';
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
    keys: ['first_name', 'last_name', 'username']
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
        { isLoaded ? renderList() : (
          <div className={adminStyles.list__container}>
            <CircularProgress color='secondary' size={30} thickness={5} />
          </div>
        ) }
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
