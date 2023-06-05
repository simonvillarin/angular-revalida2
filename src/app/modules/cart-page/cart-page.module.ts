import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './component/cart/cart.component';
import { CartPageRoutingModule } from './cart-page-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CheckoutComponent } from './component/checkout/checkout.component';



@NgModule({
  declarations: [
    CartComponent,
    CheckoutComponent,
  ],
  imports: [
    CommonModule,
    CartPageRoutingModule,
    SharedModule
  ]
})
export class CartPageModule { }
