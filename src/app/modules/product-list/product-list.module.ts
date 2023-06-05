import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ProductListRoutingModule } from './product-list-routing.module';

@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    ProductListRoutingModule,
  ],
})
export class ProductListModule {}
