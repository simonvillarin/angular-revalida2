import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface Product {
  itemName: string;
  itemBrand: string;
  category: string;
  itemImg: string;
  itemDesc: string[];
  price: number;
  qty: number;
}

const ELEMENT_DATA: Product[] = [
  {
    itemName: 'Note150',
    itemBrand: 'Acer',
    category: 'Notebooks',
    itemImg: 'Note150.svg',
    itemDesc: ['4gb Ram', '4core', '17" display'],
    price: 17500.0,
    qty: 50,
  },
  {
    itemName: 'Note150',
    itemBrand: 'Acer',
    category: 'Notebooks',
    itemImg: 'Note150.svg',
    itemDesc: ['4gb Ram', '4core', '17" display'],
    price: 17500.0,
    qty: 50,
  },
  {
    itemName: 'Note150',
    itemBrand: 'Acer',
    category: 'Notebooks',
    itemImg: 'Note150.svg',
    itemDesc: ['4gb Ram', '4core', '17" display'],
    price: 17500.0,
    qty: 50,
  },
  {
    itemName: 'Note150',
    itemBrand: 'Acer',
    category: 'Notebooks',
    itemImg: 'Note150.svg',
    itemDesc: ['4gb Ram', '4core', '17" display'],
    price: 17500.0,
    qty: 50,
  },
  {
    itemName: 'Note150',
    itemBrand: 'Acer',
    category: 'Notebooks',
    itemImg: 'Note150.svg',
    itemDesc: ['4gb Ram', '4core', '17" display'],
    price: 17500.0,
    qty: 50,
  },
  {
    itemName: 'Note150',
    itemBrand: 'Acer',
    category: 'Notebooks',
    itemImg: 'Note150.svg',
    itemDesc: ['4gb Ram', '4core', '17" display'],
    price: 17500.0,
    qty: 50,
  },
];
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements AfterViewInit {
  isShowMenu: boolean = false;

  toggleMenu() {
    this.isShowMenu = !this.isShowMenu;
  }
  dataSource = new MatTableDataSource<Product>(ELEMENT_DATA);
  displayedColumns: string[] = ['itemName', 'itemBrand', 'category', 'itemDesc', 'price', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
