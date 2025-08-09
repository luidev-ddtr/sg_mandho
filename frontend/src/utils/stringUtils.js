/**
 * Returns a string with the first letter capitalized.
 * If the input string is empty, the function returns an empty string.
 * 
 * @param {string} value - The string to capitalize.
 * @returns {string} - The capitalized string.
 * @example
 * capitalizeFirstLetter('hello') // returns 'Hello'
 */
export const capitalizeFirstLetter = (value) => {
  if (!value) {
    return '';
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
};