import { Card, Tooltip } from '@material-ui/core';

import { React } from 'react';
import styles from '../styles/TopSnacksReport.module.css';

const mockTopSnacks = {
  allTime: [
    {
      'snack_id': 8,
      'snack_type': 'Chocolate',
      'snack_name': 'KitKat',
      'sold_units': 1000,
      'image_uri': 'https://www.hersheys.com/is/image/content/dam/smartlabelproductsimage/kitkat/00034000002467-0010.png'
    },
    {
      'snack_id': 2,
      'snack_type': 'Chips',
      'snack_name': 'Lays',
      'sold_units': 999,
      'image_uri': 'https://i.imgur.com/sZF01lD.png'
    },
    {
      'snack_id': 3,
      'snack_type': 'Fruit',
      'snack_name': 'Banana',
      'sold_units': 995,
      'image_uri': 'https://i.ibb.co/SJgXP0s/blob.png'
    },
    {
      'snack_id': 4,
      'snack_type': 'Chocolate',
      'snack_name': 'Reesesss',
      'sold_units': 505,
      'image_uri': 'https://i.ibb.co/0X6pHB6/blob.png'
    },
    {
      'snack_id': 5,
      'snack_type': 'Fruit',
      'snack_name': 'Apple',
      'sold_units': 422,
      'image_uri': 'https://provarmanagement.com/wp-content/uploads/2019/12/Lucy-Rose.jpg'
    }
  ]
};

const TopSnacksReport = () => {

  const renderEmptyState = () => {
    return (
      <p>
        No snacks.
      </p>
    );
  };
  return (
    <Card className={styles.card__base}>
      <div className={styles.header}>
        <h5 className={styles.title}>Top 5 Snacks</h5>
        <p>(by units sold)</p>
      </div>
      <div className={styles.container}>
        { mockTopSnacks.allTime.length > 0 
          ? mockTopSnacks.allTime.map((snack, i) => {
            const card = (
              <div className={styles.card__container}>
                <div className={styles.image}>
                  <img src={snack.image_uri} alt={snack.snack_name}/>
                </div>
                <div className={styles.card__unit}>
                  <div className={styles.card__description}>
                    {snack.snack_name.length > 7 
                      ? (
                        <Tooltip key={i} title={snack.snack_name}>
                          <h6>{snack.snack_name.slice(0, 6)}..</h6>
                        </Tooltip>
                      ) : <h6>{snack.snack_name}</h6> }
                    <p>{snack.snack_type}</p> 
                  </div>
                  <p>{snack.sold_units} units</p>
                </div> 
              </div>
            );
            return (
              <div key={i} className={styles.card}>{ card }</div>
            );
          })
          :
          renderEmptyState()}
      </div>
    </Card>
  );
};

export default TopSnacksReport;