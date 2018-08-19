import { Component } from '@angular/core';

import { DataService } from '../services/data.service';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  providers: [DataService]
})
export class ShoppingCart {

  data = { isFormValid: false };

  constructor(private dataService: DataService) {
    this.data = this.dataService.orderDataTab;
  }

  isFormValid() {
    return this.data.isFormValid;
  }

}
