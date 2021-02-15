import React from 'react';
import classes from '../styles/snackListContainer.module.css';
import {Container} from '@material-ui/core';
import CategoryFilter from './CategoryFilter';

const SnackListContainer = () => (
  <div className={classes.root}>
    <Container maxWidth='lg'>
      <div className={classes.header}>
        <div className={classes.leftBox}>
          <p> Snacks List </p>
        </div>
        <div className={classes.suggestBox}>
          <div className={classes.suggestBoxQ}>
            Can&apos;t find what you want?
          </div>
          <div className={classes.suggestBoxLink}>
            <a className={classes.a} href='http://localhost:3000/'>
              Suggest a snack!
            </a>
          </div>
        </div>
      </div>
    </Container>
    <Container maxWidth='lg'>
      <CategoryFilter />
    </Container>
  </div>
);
export default SnackListContainer;
