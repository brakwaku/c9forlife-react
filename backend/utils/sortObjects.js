/******************************************************
 * Function as parameter to sort objects array in array
 ******************************************************/
function sortObjects(key, order = "asc") {
  return function innerSort(a, b) {
    const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
} //End of sortObjects function

export default sortObjects;
