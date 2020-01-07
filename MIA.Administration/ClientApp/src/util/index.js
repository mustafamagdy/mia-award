export const groupBy = (xs, key) => {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export const sum = (arr, key) => {
  return arr.reduce((total, obj) => obj[key] + total, 0);
};

export const distinctByProps = (array, props) => {
  const result = [];
  for (const element of array) {
    let exist = false;
    for (const a of result) {
      exist = exist || props.every(p => a[p] === element[p]);
    }
    if (!exist) {
      result.push(element);
    }
  }
  return result;
};
