import { Injectable } from '@angular/core';

import { mockCategories } from '../shared/mock-data';
import { mockProducts } from '../shared/mock-data';
import { mockRows } from '../shared/mock-data';

import { Category } from '../classes/category';
import { Product } from '../classes/product';
import { Row } from '../classes/row';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  orderDataTab = {
    name: '',
    date: 0,
    phone: '',
    email: '',
    coupon: '',
    payment: '',
    isFormValid: false
  };

  constructor() { }

  getCategories(): Category[] {
    return mockCategories;
  }

  getProducts(): Product[] {
    return mockProducts;
  }

  getRows(): Row[] {
    return mockRows;
  }
}
