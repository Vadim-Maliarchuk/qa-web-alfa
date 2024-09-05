/** Преобразование цифр из строки в число
 * @param {string} stringWithNumber
 * @returns {number}
 */
export const convertStringToNumber = (stringWithNumber) => {
  const cleanedString = stringWithNumber.replace(/[^0-9,.-]*\-/g, '').replace(',', '.');
  const parsedNumber = parseFloat(cleanedString);
  if (isNaN(parsedNumber)) {
    throw new Error(`Failed to convert string "${stringWithNumber}" to number`);
  }
  return parsedNumber;
};