import { Card } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import React from 'react';
import styles from '../../../styles/SnackCard.module.css';

const SnackCardSkeleton = () => {  
  return (
    <Card variant={'outlined'} className={styles.base}>
      <Skeleton variant={'rect'} animation={'wave'} className={styles.resize_image_skeleton}/>
      <div className={styles.label_skeleton}>
        <div className={styles.snack_name_skeleton}>
          <Skeleton variant={'text'} animation={'wave'} width={'100%'}/>
          <Skeleton variant={'text'} animation={'wave'} width={'40%'}/>
        </div>
      </div>
    </Card>
  );
};

export default SnackCardSkeleton;
