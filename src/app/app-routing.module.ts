import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ShoppingCart } from './shopping-cart/shopping-cart.component';
import { NotfoundComponent } from './notfound/notfound.component';

const appRoutes: Routes = [
  {
    path: 'order',
    component: ShoppingCart,
    loadChildren: './shopping-cart/shopping-cart.module#ShoppingCartModule'
  },
  {
    path: '',
    redirectTo: 'order',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  declarations: [
    ShoppingCart,
    NotfoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
