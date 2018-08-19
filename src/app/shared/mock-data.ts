import { Product } from '../classes/product';
import { Category } from '../classes/category';
import { Row } from '../classes/row';

const categoriesAmount = 5;
const productsAmount = 30;
const rowsAmount = 29;

let mockCategories: Category[] = [];
let mockProducts: Product[] = [];
let mockRows: Row[] = [];

// Make categories
for (let i = 0; i < categoriesAmount; i++) {
  mockCategories.push({
    id: i,
    title: `Category #${i + 1}`,
  });
}

// Make products
for (let i = 0; i < productsAmount; i++) {
  mockProducts.push({
    id: i,
    categoryTitle: mockCategories[Math.floor(Math.random() * categoriesAmount)].title,
    title: `Prod #${i + 1}`,
    price: 10 * (i + 1),
    discount: Math.floor(Math.random() * (i + 1)),
  });
}

// Make rows
for (let i = 0; i < rowsAmount; i++) {
  let cat = mockCategories[Math.floor(Math.random() * categoriesAmount)];
  let prodsForCat = mockProducts.filter(prod => prod.categoryTitle == cat.title);
  let prod = prodsForCat[Math.floor(Math.random() * prodsForCat.length)];
  let amount = Math.floor(Math.random() * 25);

  mockRows.push({
    id: i,
    categoryTitle: cat.title,
    productTitle: prod.title,
    price: prod.price,
    discount: prod.discount,
    amount: amount,
    priceTotal: prod.price * amount,
    discountTotal: prod.discount * amount,
    total: (prod.price * amount) - (prod.discount * amount),
    beingEdited: false
  });
}

export { mockProducts };
export { mockCategories };
export { mockRows };
