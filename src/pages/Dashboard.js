import ImageUploader from '../components/ImageUploader';
import React from 'react';
import styles from '../styles/Page.module.css';

const Dashboard = () => {
  return (
    <div className={styles.base}>
      <h4>Dashboard</h4>
      <ImageUploader />
    </div>
  );
};

export default Dashboard;
