import React from 'react';
import SnacksContainer from '../components/SnacksContainer';
import {mockSnacks} from '../mockSnacks';

const Snacks = () => {
  return (
    <div>
      <p>Snacks Page</p>
      <SnacksContainer snacks={mockSnacks}/>
    </div>
  );
};

export default Snacks;
