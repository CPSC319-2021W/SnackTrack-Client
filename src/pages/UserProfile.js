import { React, useEffect, useState } from 'react';
import { deleteUser, getUserOrders, getUserPayments } from '../services/UsersService';
import {
  setApiResponse,
  setToastNotificationOpen
} from '../redux/features/notifications/notificationsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import AppButton from '../components/AppButton';
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow.svg';
import ConfirmationDialog from '../components/ConfirmationDialog';
import { NOTIFICATIONS } from '../constants';
import OrdersTable from '../components/OrdersTable/OrdersTable';
import PaymentsTable from '../components/PaymentsTable';
import { ROUTES } from '../constants';
import ToastNotification from '../components/ToastNotification';
import UserCard from '../components/UserCard/UserCard';
import UserCardSkeleton from '../components/UserCard/UserCardSkeleton';
import UserProfileNotFound from '../pages/UserProfileNotFound';
import dialogStyles from '../styles/Dialog.module.css';
import { getUserById } from '../services/UsersService';
import styles from '../styles/Page.module.css';
import usersStyles from '../styles/UserProfile.module.css';

const INITIAL_PAYMENTS = {
  total_rows: 0,
  payments: [],
  total_pages: 1,
  current_page: 0,
  initial: true
};

const INITIAL_ORDERS = {
  total_rows: 0,
  transactions: [],
  total_pages: 1,
  current_page: 0,
  initial: true
};

const UserProfile = () => {
  const history = useHistory();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false);
  const dispatch = useDispatch();
  const [rowsPerPage] = useState(8);
  const [paymentsResponse, setPaymentsResponse] = useState(INITIAL_PAYMENTS);
  const [ordersResponse, setOrdersResponse] = useState(INITIAL_ORDERS);
  const [paymentsError, setPaymentsError] = useState(false);
  const [ordersError, setOrdersError] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const { isToastNotificationOpen, apiResponse } = useSelector(
    (state) => state.notificationsReducer
  );
  const { userId } = useSelector((state) => state.usersReducer.profile);

  const openToastNotification = (bool) => dispatch(setToastNotificationOpen(bool));

  const onApiResponse = (response) => dispatch(setApiResponse(response));

  const handleGoBack = () => {
    history.push(ROUTES.USERS);
  };

  const handleApiResponse = (response) => {
    onApiResponse(response);
    openToastNotification(true);
  };

  const handlePaymentChangePage = async (page) => {
    try {
      const paymentResponse = await getUserPayments(id, page, rowsPerPage);
      setPaymentsResponse(paymentResponse);
      setPaymentsError(false);
    } catch (err) {
      console.log(err);
      setPaymentsError(true);
    }
  };

  const handleOrderChangePage = async (page) => {
    try {
      const transactionResponse = await getUserOrders(id, page, rowsPerPage);
      setOrdersResponse(transactionResponse);
      setOrdersError(false);
    } catch (err) {
      console.log(err);
      setOrdersError(true);
    }
  };

  const handleClose = () => {
    openToastNotification(false);
  };

  const handleMakePayment = async () => {
    await handleOrderChangePage(0);
    await handlePaymentChangePage(0);
  };

  const updateProfileBalance = (newBalance) => {
    setUser({ ...user, balance: newBalance });
  };

  const handleOpenDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleDelete = async () => {
    try {
      setIsDeleteLoading(true);
      await deleteUser(id);
      setIsDeleteLoading(false);
      handleGoBack();
      handleApiResponse('USER_DELETE_SUCCESS');
    } catch (e) {
      handleApiResponse('ERROR');
    }
  };

  const resetAll = async (newBalance) => {
    handleMakePayment();
    updateProfileBalance(newBalance);
  };

  useEffect(async () => {
    try {
      const userResponse = await getUserById(id);
      setUser(userResponse);
    } catch (err) {
      console.log(err);
      setUserNotFound(true);
    }
  }, []);

  useEffect(async () => {
    if (user) {
      try {
        const orderResponse = await getUserOrders(id, 0, rowsPerPage);
        setOrdersResponse(orderResponse);
        setOrdersError(false);
      } catch (err) {
        console.log(err);
        setOrdersError(true);
      }
      try {
        const paymentResponse = await getUserPayments(id, 0, rowsPerPage);
        setPaymentsResponse(paymentResponse);
        setPaymentsError(false);
      } catch (err) {
        console.log(err);
        setPaymentsError(true);
      }
    }
  }, [user]);

  return (
    <div className={styles.base}>
      <div className={styles.header__single}>
        <h5 className={`${styles.title} ${usersStyles.goBack}`} onClick={handleGoBack}>
          <div className={usersStyles.icon__container}>
            <ArrowIcon />
          </div>
          Back to Users List
        </h5>
        { Number(id) !== userId && !userNotFound
          ? (
            <div className={styles.top_button__container}>
              <AppButton
                cancel
                onClick={handleOpenDialog}
              >
                Delete User
              </AppButton>
            </div>
          ) : null
        }
      </div>
      {userNotFound ? (
        <UserProfileNotFound />
      ) : (
        <>
          {user ? <UserCard user={user} onHandleApiResponse={handleApiResponse} /> : <UserCardSkeleton noHover />}
          <div className={usersStyles.tables__container}>
            <div className={usersStyles.ordersTable}>
              <OrdersTable
                isLoaded={!ordersResponse.initial}
                isEmpty={ordersResponse.transactions.length === 0}
                data={ordersResponse}
                rowsPerPage={rowsPerPage}
                balance={user?.balance}
                error={ordersError}
                updateProfileBalance={updateProfileBalance}
                onHandleApiResponse={handleApiResponse}
                onChangePage={handleOrderChangePage}
                onMakePayment={handleMakePayment}
                onReload={resetAll}
              />
            </div>
            <div className={usersStyles.paymentsTable}>
              <PaymentsTable
                isLoaded={!paymentsResponse.initial}
                isEmpty={paymentsResponse.payments.length === 0}
                error={paymentsError}
                data={paymentsResponse}
                rowsPerPage={rowsPerPage}
                setSnackBar={handleApiResponse}
                onChangePage={handlePaymentChangePage}
              />
            </div>
          </div>
        </>
      )}
      <ConfirmationDialog
        open={isDeleteDialogOpen}
        title={'Wait a sec!'}
        submitText={'Yes, delete'}
        declineText={'No, keep'}
        isSubmitLoading={isDeleteLoading}
        handleClose={handleCloseDialog}
        onDecline={handleCloseDialog}
        onSubmit={handleDelete}
      >
        Are you sure you want to delete
        <span className={dialogStyles.text__emp}>
          {` ${user?.first_name} ${user?.last_name}`}
        </span>
        ?
      </ConfirmationDialog>
      <ToastNotification
        open={isToastNotificationOpen}
        notification={NOTIFICATIONS[apiResponse]}
        onClose={handleClose}
      />
    </div>
  );
};

export default UserProfile;
