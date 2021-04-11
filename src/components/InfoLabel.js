import { React } from 'react';

import { Tooltip, makeStyles } from '@material-ui/core';
import classNames from 'classnames';

import styles from '../styles/InfoLabel.module.css';

const customStyles = makeStyles(() => ({
  customWidth: {
    maxWidth: 175
  }
}));

const TextInputLiveFeedback = ({ info, type }) => {
  const classes = customStyles();
  return (
    <Tooltip classes={{ tooltip: classes.customWidth }} title={info}>
      <span className={classNames({
        [styles.info__icon]: true,
        [styles[type]]: !!type
      })}>
        !
      </span>
    </Tooltip>
  );
};

export default TextInputLiveFeedback;
