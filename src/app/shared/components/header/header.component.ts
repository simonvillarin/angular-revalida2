import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isShowMenu: boolean = false;
  isShowDropdown: boolean = false;
  isShowSearch: boolean = false;
  searchInput: string = '';

  toggleMenu = () => {
    this.isShowMenu = !this.isShowMenu;
    this.isShowDropdown = false;
    this.isShowSearch = false;
  };

  toggleDropdown = () => {
    this.isShowDropdown = !this.isShowDropdown;
    this.isShowMenu = false;
    this.isShowSearch = false;
  };

  toggleSearch = () => {
    this.isShowSearch = !this.isShowSearch;
    this.isShowDropdown = false;
    this.isShowMenu = false;
  };

  clearInput = () => {
    this.searchInput = '';
  };
}
