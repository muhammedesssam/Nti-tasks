import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users: any = [];

  handleUser(event: any) {
    this.users.push(event);
  }

  deleteUser(i: any) {
    this.users.splice(i, 1);
  }
  updateUser(user: any) {
    user.name = prompt('enter your name');
    user.email = prompt('enter your email');
  }
}
