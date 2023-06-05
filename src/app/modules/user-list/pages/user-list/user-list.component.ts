import { Component } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  isShowMenu: boolean = false;

  toggleMenu() {
    this.isShowMenu = !this.isShowMenu;
  }
}
