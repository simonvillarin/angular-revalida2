import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {

  products: any = [
    {
        "prodName": "Lenovo DB60 Slim USB Portable DVD Burner DB60-WW",
        "prodPrice": 650.00,
        "prodImg": "//cdn.shopify.com/s/files/1/2227/7667/products/LenovoDB60SlimUSBPortableDVDBurnerDB60-WW_1024x1024.jpg?v=1671768668",
        "description": "Portable, DVD Burner",
        "specifications": [
          "Portable, DVD Burner", 
          "Hardware Interface USB", 
          "Hardware Platform Laptop", 
          "Item Dimensions LxWxH 10 x 4 x 1 inches"
        ]
    }
]
  
  quantity: number = 1;

  activeTab: string = 'description';

  constructor(private router: Router) {}

  increase() {
    this.quantity++;
  }

  decrease() {
    if(this.quantity > 0){
      this.quantity--;
    }
  }

  changeTab(tab: string) {
    this.activeTab = tab;
  }

  addToCart() {
    this.router.navigate(['user/cart/page'])
  }

  buyNow() {
    this.router.navigate(['user/checkout'])
  }
}
