import '../styles/SnackGrid.css';

import { Grid } from '@material-ui/core';
import React from 'react';
import SnackCard from './SnackCard';

const SnackGrid = (props) => {
  const { snacks, onClick } = props;
  return (
    <Grid container spacing={5}>
      {snacks.map((snack, index) => {
        return (
          <Grid key={index} item className='gridItem' lg={3} sm={6}>
            <SnackCard snack={snack} onClick={() => onClick(snack.snackName)} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default SnackGrid;
