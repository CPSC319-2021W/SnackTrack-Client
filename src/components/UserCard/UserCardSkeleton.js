import styles from '../../styles/UserCard.module.css';

import { Card } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import React from 'react';

const UserCardSkeleton = () => { 
  return (
    <Card variant={'outlined'} className={styles.base}>
      <div className={styles.action_area}>
        <Skeleton variant={'circle'} animation={'wave'} className={styles.image} />
        <div className={styles.text}>
          <Skeleton variant={'text'} animation={'wave'} className={styles.fullname}/>
          <Skeleton variant={'text'} animation={'wave'}/>
        </div>
      </div>
    </Card>
  );
};
  
export default UserCardSkeleton;
