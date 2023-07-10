export function zip(...arrays) {
  const length = Math.min(...arrays.map((arr) => arr.length));
  const result = [];

  for (let i = 0; i < length; i++) {
    result.push(arrays.map((arr) => arr[i]));
  }

  return result;
}


export function rearrangeObject(data, pola){
  const myObject = data;  
  const keyOrder = pola;  // Desired order of keys //['key3', 'key1', 'key2']
  const reorderedObject = new Map();
  // Copy key-value pairs from the object to the Map in the desired order
  keyOrder.forEach(key => {
    if (myObject.hasOwnProperty(key)) {
      reorderedObject.set(key, myObject[key]);
    }
  });
  // Convert the Map back to a plain object
  const modifiedObject = Object.fromEntries(reorderedObject);
  return modifiedObject;
}