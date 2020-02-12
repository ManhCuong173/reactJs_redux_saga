/* eslint-disable no-plusplus */
const findIndex = (array, item) => {
  let indexResult = -1;
  for (let index = 0; index < array.length; index++) {
    if (array[index].id === item.id) indexResult = index;
  }
  return indexResult;
};

export default findIndex;
