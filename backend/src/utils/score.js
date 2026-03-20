function getCommonItems(arr1 = [], arr2 = []) {
    const set2 = new Set(arr2.map((item) => String(item).toLowerCase().trim()));
    return arr1.filter((item) => set2.has(String(item).toLowerCase().trim()));
  }
  
  function hasAny(arr = [], values = []) {
    const set = new Set(arr.map((item) => String(item).toLowerCase().trim()));
    return values.some((value) => set.has(String(value).toLowerCase().trim()));
  }
  
  module.exports = {
    getCommonItems,
    hasAny,
  };
  