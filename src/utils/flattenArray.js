export const flattenArray = (arr) => {
  var dataToArr = Object.keys(arr).map((key, index) =>
    arr[key].map((obj) => ({
      ...obj,
      date: key,
    }))
  );
  return dataToArr.flat(1);
};
