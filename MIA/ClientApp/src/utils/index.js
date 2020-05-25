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

Object.defineProperty(Array.prototype, "chunk", {
  value: function(chunkSize) {
    const result = [];
    for (let i = 0; i < this.length; i += chunkSize) result.push(this.slice(i, i + chunkSize));
    return result;
  }
});

export const fileToBase64 = (fileData) => {
  return new Promise(resolve => {
    var reader = new FileReader();
    // Read file content on file loaded event
    reader.onload = function(event) {
      var dataUrl = reader.result;
      var base64 = dataUrl.split(",")[1];
      resolve(base64);
    };

    // Convert data to base64
    reader.readAsDataURL(fileData);
  });
};
