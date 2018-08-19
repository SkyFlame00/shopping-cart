import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-order-data-tab',
  templateUrl: './order-data-tab.component.html',
  styleUrls: ['./order-data-tab.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrderDataTabComponent implements OnInit {

  name: string;
  date: any;
  phone: string;
  email: string;
  coupon: string;
  payment: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.name = this.dataService.orderDataTab.name;
    this.date = this.dataService.orderDataTab.date;
    this.phone = this.dataService.orderDataTab.phone;
    this.email = this.dataService.orderDataTab.email;
    this.coupon = this.dataService.orderDataTab.coupon;
    this.payment = this.dataService.orderDataTab.payment;
  }

  validateForm() {
    let isFormValid = this.name && this.date && this.phone && this.payment;
    this.dataService.orderDataTab.isFormValid = Boolean(isFormValid);
    return isFormValid;
  }

  nameChange() {
    this.dataService.orderDataTab.name = this.name;
  }

  dateChange() {
    this.dataService.orderDataTab.date = this.date;
  }

  phoneChange() {
    this.dataService.orderDataTab.phone = this.phone;
  }

  emailChange() {
    this.dataService.orderDataTab.email = this.email;
  }

  couponChange() {
    this.dataService.orderDataTab.coupon = this.coupon;
  }

  paymentChange() {
    this.dataService.orderDataTab.payment = this.payment;
  }

}
