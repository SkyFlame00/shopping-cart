import { Category } from './category';
import { Product } from './product';

export class Row {
  categoryTitle: string;
  productTitle: string;
  id: number;
  price: number;
  discount: number;
  amount: number;
  priceTotal: number;
  discountTotal: number;
  total: number;
  beingEdited: boolean;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
