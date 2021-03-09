import React from 'react';
import styles from '../styles/Page.module.css';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { id } = useParams();

  return (
    <div className={styles.base}>
      <h4>Account: {id}</h4>
    </div>
  );
};

export default UserProfile;
