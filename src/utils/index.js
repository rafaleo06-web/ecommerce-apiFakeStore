/**
 * function calculates totalPrice of new order
 * @param {Array} products cartProduct: Array of Objects
 * @returns {number}
 */

export const totalPrice = (products) => {
  return products.reduce((sum, product) => sum + product.price * Number(product.quantity), 0);
};
