import React from 'react';
import SnackCard from '../components/SnackCard';

const snack = {
  imageUri:
    'https://www.hersheys.com/content/dam/smartlabelproductsimage/kitkat/00034000002467-0010.png',
  snackName: 'KitKat',
  price: 125
};

const snackTwo = {
  imageUri: 'https://images.heb.com/is/image/HEBGrocery/001767120',
  snackName: 'Strawberry Pocky',
  price: 125
};

const snackThree = {
  imageUri:
    'https://www.missvickies.ca/sites/missvickies.ca/files/30015435_MissVickies_SeaSaltMaltVinegar_200g.png',
  snackName: "Miss Vickie's Sea Salt & Malt Vinegar",
  price: 125
};

const snackFour = {
  imageUri:
    'https://cdn.mos.cms.futurecdn.net/42E9as7NaTaAi4A6JcuFwG-1024-80.jpg.webp',
  snackName: 'Banana',
  price: 25
};

const Snacks = () => (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      width: '100%'
    }}>
    <SnackCard snack={snack} onClick={() => alert('kitkat')} />
    <SnackCard snack={snackFour} onClick={() => alert('banana')} />
    <SnackCard
      class="flex-child"
      snack={snackTwo}
      onClick={() => alert('strawberry pocky')}
    />
    <SnackCard snack={snackThree} onClick={() => alert('miss vickies')} />
    <p>SnackList Page</p>
  </div>
);

export default Snacks;
