import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import { Container } from '@material-ui/core';
import HeaderBar from './HeaderBar';

import styles from '../styles/Layout.module.css';

const Layout = (props) => {
  const { children } = props;
  const { firstName, balance } = useSelector(
    (state) => state.usersReducer
  );

  return (
    <Fragment>
      <HeaderBar balance={balance} firstName={firstName} />
      <Container fixed className={styles.base}>
        { children }
      </Container>
    </Fragment>
  );
};

export default Layout;
