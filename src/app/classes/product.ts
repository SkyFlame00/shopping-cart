export class Product {
  id: number;
  title: string;
  categoryTitle: string;
  price: number;
  discount: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
