import React from 'react';
import SnacksContainer from '../components/SnacksContainer';
import { mockSnacks as snacksResponse } from '../mockSnacks';

const Snacks = () => {
  return (
    <div>
      <p>Snacks Page</p>
      <SnacksContainer snacks={snacksResponse.snacks} />
    </div>
  );
};

export default Snacks;
