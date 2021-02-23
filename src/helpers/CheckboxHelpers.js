const deselectOne = (arr, deselection) => {
  const index = arr.indexOf(deselection);
  let newArray = [];
  if (index === -1) {
    newArray = arr;
  } else if (index === 0) {
    newArray = newArray.concat(arr.slice(1));
  } else if (index === arr.length - 1) {
    newArray = newArray.concat(arr.slice(0, -1));
  } else if (index > 0) {
    newArray = newArray.concat(arr.slice(0, index), arr.slice(index + 1));
  }
  return newArray;
};

export { deselectOne };
