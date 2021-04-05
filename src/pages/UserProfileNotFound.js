import { Card, CardActionArea } from '@material-ui/core';

import React from 'react';
import classNames from 'classnames';
import styles from '../styles/UserCard.module.css';
import { useParams } from 'react-router-dom';

const UserProfileNotFound = () => {
  const { id } = useParams();

  return (
    <Card variant={'outlined'} className={styles.base__noHover}>
      <CardActionArea
        className={classNames({
          [styles.action_area]: true,
          [styles.action_area__unclickable]: true
        })}
      >
        <div className={styles.text}>
          <p className={styles.text__emphasis}>
            {`Oops! User ${id} not found.`}
          </p>
        </div>
      </CardActionArea>
    </Card>
  );
};

export default UserProfileNotFound;
