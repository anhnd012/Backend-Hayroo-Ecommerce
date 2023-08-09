export const subTotal = (id, price) => {
  let carts = JSON.parse(localStorage.getItem("cart"));
  let subTotalCost = carts.filter((items) => items.id === id ).reduce((total, item) => total + item.quantitiy * price, 0);
  return subTotalCost;
};

export const quantity = (id) => {
  let carts = JSON.parse(localStorage.getItem("cart"));
  let product = carts.filter((items) => items.id === id).map((item) => item.quantitiy);
  return product;
};

export const totalCost = () => {
  let carts = JSON.parse(localStorage.getItem("cart"));
  let totalCost = carts.reduce((total, items) => total + items.quantitiy * items.price, 0);
  return totalCost;
};
