import React, { Fragment } from 'react';

import { Card, Tooltip } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import AppButton from './AppButton';
import { GENERIC_ERROR } from '../constants';
import { setSuggestionState } from '../redux/features/snacks/snacksSlice';
import styles from '../styles/SuggestionsBox.module.css';

const SuggestionsBox = ({ error }) => {
  const dispatch = useDispatch();
  const { suggestions } = useSelector((state) => state.snacksReducer);

  const handleSetActive = (bean) => {
    dispatch(setSuggestionState(bean));
  };

  const renderEmptyState = () => {
    return (
      <p>
        No suggestions.
      </p>
    );
  };

  const renderError = () => {
    return (
      <p>
        { GENERIC_ERROR }
      </p>
    );
  };

  const renderBeans = () => {
    return (
      <Fragment>
        { suggestions.length > 0
          ? suggestions.map((bean, i) => {
            const { text, isActive } = bean;
            const child = (
              <div
                className={classNames({
                  [styles.bean]: true,
                  [styles.bean__active]: isActive
                })}
                onClick={() => handleSetActive(bean)}
              >
                { text }
              </div>
            );
            return text.length > 28
              ? ( 
                <Tooltip key={i} title={text}>
                  { child }
                </Tooltip>
              )
              : <Fragment key={i}>{ child }</Fragment>;
          })
          : renderEmptyState()
        }
      </Fragment>
    );
  };

  return (
    <Card className={styles.card__base}>
      <div className={styles.header}>
        <h5 className={styles.title}>Suggestions</h5>
        <AppButton
          cancel
          disabled={error}
        >
          Clear All
        </AppButton>
      </div>
      <div className={styles.bean__container}>
        { error ? renderError() : renderBeans() }
      </div>
    </Card>
  );
};

export default SuggestionsBox;
