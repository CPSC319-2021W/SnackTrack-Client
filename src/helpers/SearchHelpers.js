import Fuse from 'fuse.js';

const handleSearch = (arrayToSearch, searchValue, setArrayToDisplay, searchOptions) => {
  searchValue = searchValue.trim();
  if (searchValue === '') {
    setArrayToDisplay(arrayToSearch);
  } else {
    const fuse = new Fuse(arrayToSearch, searchOptions);
    const results = fuse.search(searchValue);
    const searched = results.map((itemIndexPair) => {
      return itemIndexPair.item;
    });
    setArrayToDisplay(searched);
  }
};

export { handleSearch };
