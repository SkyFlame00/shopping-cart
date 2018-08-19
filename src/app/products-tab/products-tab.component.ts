import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { DataService } from '../services/data.service';

import { Category } from '../classes/category';
import { Product } from '../classes/product';
import { Row } from '../classes/row';

@Component({
  selector: 'app-products-tab',
  templateUrl: './products-tab.component.html',
  styleUrls: ['./products-tab.component.scss']
})
export class ProductsTabComponent implements OnInit {

  rows: Row[] = [];
  displayedRows: Row[] = []; // 10 displayed rows
  categories: Category[];
  products: Product[];
  productsForCategory: Product[] = []; // When a category is chosen all related
                                       // products are copied here
  editedRow: Row = new Row(); // Reference to the row being edited
  tmpRow: Row = new Row(); // Temp object to store data when editing the existing row

  // For pagination
  numOfPages: number = 1;
  currentPage: number = 1;

  // Three first for the use in the table
  sumPriceTotalForPage: number = 0;
  sumDiscountTotalForPage: number = 0;
  sumTotalForPage: number = 0;
  sumTotal: number = 0;

  isBeingAdded: boolean = false; // Adding row
  isInsertedCurrentPageCorrect: boolean = true; // Manual changing a number of page
  isAmountCorrect: boolean = true;
  isCatEmpty: boolean = false;
  isProdEmpty: boolean = false;

  // Temp object for adding new row
  addedRow: Row = {
    id: this.rows.length,
    categoryTitle: '',
    productTitle: '',
    price: 0,
    discount: 0,
    amount: 1,
    priceTotal: 0,
    discountTotal: 0,
    total: 0,
    beingEdited: false
  };

  constructor(
    private router: Router,
    private dataService: DataService
  ) {
    this.categories = this.dataService.getCategories();
    this.products = this.dataService.getProducts();
    this.rows = this.dataService.getRows();
  }

  ngOnInit() {
    if (!this.dataService.orderDataTab.isFormValid) {
      this.router.navigateByUrl('/order/details');
    }

    // Necessary procedures
    this.refreshNumOfPages(false);
    this.refreshCurrentPage();
    this.updateTotalSum();
    this.updateSums();
  }

  refreshNumOfPages(withAddingProductForm: boolean = false) {
    // False says there is no row being added
    // If true, we need to imitate that the row being added in the rows[] stack
    let increment = withAddingProductForm ? 1 : 0;
    this.numOfPages = Math.floor((this.rows.length - 1 + increment)/10) + 1;
    this.numOfPages = this.numOfPages == 0 ? 1 : this.numOfPages;
  }

  // When a row is started being added
  addNewRow(): null {
    if (this.isBeingAdded) return;

    // If any row is being edited, cease it
    this.editedRow.beingEdited = false;

    // Will show the last rows
    let amount = String(this.rows.length);
    let elemInStack = amount.slice(-1);

    if (elemInStack == '0') {
      this.displayedRows = [];
    }
    else {
      this.displayedRows = this.rows.slice(-elemInStack);
    }

    this.refreshNumOfPages(true);
    this.currentPage = this.numOfPages; // Because new row is sticked to the end
    this.isBeingAdded = true;
  }

  ifErrorsBeforeSubmitting(row: Row): boolean {
    let errNum = 0;

    if (!row.categoryTitle) {
      this.isCatEmpty = true;
      errNum++;
    }

    if (!row.productTitle) {
      this.isProdEmpty = true;
      errNum++;
    }

    if (!this.isAmountCorrect) {
      errNum++;
    }

    if (errNum > 0) {
      return true;
    }
    else {
      return false;
    }
  }

  submitAddingRow() {
    if (this.ifErrorsBeforeSubmitting(this.addedRow)) return;

    this.isBeingAdded = false;

    this.rows.push(new Row({
      categoryTitle: this.addedRow.categoryTitle,
      productTitle: this.addedRow.productTitle,
      id: this.rows.length,
      price: +this.addedRow.price,
      amount: +this.addedRow.amount,
      discount: +this.addedRow.discount,
      beingEdited: false,
      priceTotal: +this.addedRow.priceTotal,
      discountTotal: +this.addedRow.discountTotal,
      total: +this.addedRow.total
    }));

    this.refreshNumOfPages(false); // Master of adding row is now hidden
    this.refreshCurrentPage();
    this.clearAddingFields();
    this.updateSums();
    this.updateTotalSum();
  }

  cancelAdding() {
    this.isCatEmpty = false;
    this.isProdEmpty = false;
    this.isBeingAdded = false;

    this.refreshNumOfPages(false);
    this.currentPage = this.numOfPages;
    this.clearAddingFields();
    this.refreshCurrentPage();
  }

  refreshCurrentPage() {
    let startIndex = (this.currentPage - 1) * 10;
    let endIndex;

    if (startIndex + 10 > this.rows.length) {
      endIndex = startIndex + Number(String(this.rows.length).slice(-1));
    }
    else {
      endIndex = startIndex + 10;
    }

    this.displayedRows = this.rows.slice(startIndex, endIndex);
    this.updateSums();
  }

  editProduct(row: Row) {
    // Hide another row being edited if any
    this.editedRow.beingEdited = false;
    // Hide new row being added
    this.isBeingAdded = false;
    this.clearAddingFields();
    this.editedRow = row;

    Object.assign(this.tmpRow, row);

    this.productsForCategory = [];
    let catTitle = row.categoryTitle;

    // Add all products related to the current category
    for (let i = 0; i < this.products.length; i++) {
      let prod = this.products[i];
      if (prod.categoryTitle == catTitle) {
        this.productsForCategory.push(prod);
      }
    }

    row.beingEdited = true;
  }

  deleteProduct(row: Row) {
    let index = this.rows.indexOf(row);

    if (index >= 0) {
      this.rows.splice(index, 1);
      this.refreshNumOfPages();

      if (this.currentPage > this.numOfPages) {
        this.currentPage = this.numOfPages;
      }

      this.refreshCurrentPage();
      this.updateTotalSum();
    }
  }

  confirmChanges(row: Row) {
    if (this.ifErrorsBeforeSubmitting(this.tmpRow)) return;

    Object.assign(row, this.tmpRow);
    row.beingEdited = false;
    this.tmpRow = new Row();
    this.updateTotalSum();
    this.updateSums();
  }

  cancelEditing(row: Row) {
    this.isCatEmpty = false;
    this.isProdEmpty = false;
    row.beingEdited = false;
    this.tmpRow = new Row();
  }

  goPreviousPage() {
    if ( !(+this.currentPage >= 1 && +this.currentPage <= this.numOfPages) ) {
      return;
    }

    this.currentPage = +this.currentPage - 1;

    // Two next lines is placed here to check if a new row was being added
    this.isBeingAdded = false;
    this.refreshNumOfPages(false);
    this.refreshCurrentPage();
  }

  goNextPage() {
    if ( !(+this.currentPage >= 1 && +this.currentPage <= this.numOfPages) ) {
      return;
    }

    this.currentPage = +this.currentPage + 1;
    this.refreshCurrentPage();
  }

  // Handler is only for manually added values (in the input)
  currentPageChange() {
    this.currentPage = +this.currentPage;
    let isBetweenMinAndMax = this.currentPage >= 1 && this.currentPage <= this.numOfPages;
    let isInteger = (this.currentPage == Math.floor(this.currentPage)) ||
                    (this.currentPage == Math.ceil(this.currentPage));

    if (isBetweenMinAndMax && isInteger) {
      this.isInsertedCurrentPageCorrect = true;
      this.refreshCurrentPage();
      this.isBeingAdded = false;
    }
    else {
      this.isInsertedCurrentPageCorrect = false;
    }
  }

  categoryChange(row: Row) {
    this.isCatEmpty = false;

    let catTitle = row.categoryTitle;
    row.productTitle = '';

    this.productsForCategory = [];

    if (row == this.tmpRow) {
      row.productTitle = '';
      row.price = 0;
      row.discount = 0;
      row.amount = 1;
      row.priceTotal = 0;
      row.discountTotal = 0;
      row.total = 0;
    }

    for (let i = 0; i < this.products.length; i++) {
      let prod = this.products[i];
      if (prod.categoryTitle == catTitle) {
        this.productsForCategory.push(prod);
      }
    }

  }

  productChange(row: Row) {
    this.isProdEmpty = false;

    let prodTitle = row.productTitle;

    for (let i = 0; i < this.productsForCategory.length; i++) {
      if (this.productsForCategory[i].title == prodTitle) {
        row.price = this.productsForCategory[i].price;
        row.discount = this.productsForCategory[i].discount;
        this.amountChange(row);
        break;
      }
    }
  }

  amountChange(row: Row) {
    let amountFloor = Math.floor(row.amount);
    let amountCeil = Math.ceil(row.amount);

    if (row.amount > 0 && (row.amount == amountFloor || row.amount == amountCeil)) {
      this.isAmountCorrect = true;
    }
    else {
      this.isAmountCorrect = false;
      return;
    }

    let amount = row.amount;
    row.priceTotal = row.price * amount;
    row.discountTotal = row.discount * amount;
    row.total = row.priceTotal - row.discountTotal;
  }

  clearAddingFields() {
    this.addedRow = {
      id: this.rows.length,
      categoryTitle: '',
      productTitle: '',
      price: 0,
      discount: 0,
      amount: 1,
      priceTotal: 0,
      discountTotal: 0,
      total: 0,
      beingEdited: false
    };
  }

  updateSums() {
    let sumPriceTotal = 0;
    let sumDiscountTotal = 0;
    let sumTotal = 0;

    for (let i = 0; i < this.displayedRows.length; i++) {
      sumPriceTotal += this.displayedRows[i].priceTotal;
      sumDiscountTotal += this.displayedRows[i].discountTotal;
      sumTotal += this.displayedRows[i].total;
    }

    this.sumPriceTotalForPage = sumPriceTotal;
    this.sumDiscountTotalForPage = sumDiscountTotal;
    this.sumTotalForPage = sumTotal;
  }

  updateTotalSum() {
    this.sumTotal = this.rows.reduce((sum, item) => sum + item.total, 0);
  }

}
