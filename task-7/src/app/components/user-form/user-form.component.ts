import { Component, EventEmitter, Output } from '@angular/core';
// import { prototype } from 'jasmine';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  @Output() sendingUserData = new EventEmitter<any>();

  userData = {
    name: '',
    email: '',
  };

  handleSubmit() {
    const newObj = {
      name: this.userData.name,
      email: this.userData.email,
    };

    this.sendingUserData.emit(newObj);
  }
}
