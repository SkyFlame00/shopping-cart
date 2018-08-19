import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { OrderDataTabComponent } from '../order-data-tab/order-data-tab.component';
import { ProductsTabComponent } from '../products-tab/products-tab.component';

import { AlertModule } from 'ngx-bootstrap';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { ShoppingCart } from './shopping-cart.component';

const shoppingCartRoutes: Routes = [
  {
    path: '',
    redirectTo: 'details'
  },
  {
    path: 'details',
    component: OrderDataTabComponent
  },
  {
    path: 'products',
    component: ProductsTabComponent
  }
];

@NgModule({
  declarations: [
    OrderDataTabComponent,
    ProductsTabComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(shoppingCartRoutes),
    FormsModule,
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  exports: [
    RouterModule
  ]
})
export class ShoppingCartRoutingModule { }
