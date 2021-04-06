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
  const { users } = useSelector((state) => state.usersReducer);

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

  const renderTooltip = (text, firstName, lastName) => {
    return (
      <Fragment>
        <div>{ text }</div>
        <div>{ `Suggested by: ${firstName} ${lastName.slice(0, 1)}.` }</div>
      </Fragment>
    );
  };

  const renderBeans = () => {
    return (
      <Fragment>
        { suggestions.length > 0
          ? suggestions.map((bean, i) => {
            const { first_name, last_name } = users.find((user) => bean.userId === user.user_id);
            const { text, isActive } = bean;
            return (
              <Tooltip key={i} title={renderTooltip(text, first_name, last_name)}>
                <div
                  className={classNames({
                    [styles.bean]: true,
                    [styles.bean__active]: isActive
                  })}
                  onClick={() => handleSetActive(bean)}
                >
                  { text }
                </div>
              </Tooltip>
            );
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
