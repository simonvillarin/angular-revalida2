import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserListRoutingModule } from './user-list-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { UserListComponent } from './pages/user-list/user-list.component';

@NgModule({
  declarations: [UserListComponent],
  imports: [CommonModule, MatIconModule, RouterModule, UserListRoutingModule],
})
export class UserListModule {}
