import CategoryFilter from './CategoryFilter';
import React from 'react';
import SnackGrid from './SnackGrid';

const SnacksContainer = (props) => {
  const { snacks, filters } = props;

  return (
    <div>
      <CategoryFilter />
      <div>
        {filters.length === 0 ? (
          <SnackGrid snacks={snacks} onClick={alert} />
        ) : (
          <SnackGrid
            snacks={snacks.filter((item) => {
              return filters.includes(item.snack_type_id);
            })}
            onClick={alert}
          />
        )}
      </div>
    </div>
  );
};

export default SnacksContainer;
