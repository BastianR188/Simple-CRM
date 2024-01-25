import { Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MyServiceService } from '../firestore.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [Validators.required]);
  hide = true;

  constructor(public service: MyServiceService, public router: Router) {}
  login() {
    this.service.isLoggedIn = true;
    this.isLinkActive('/');
  }
  isLinkActive(route: string) {
    return this.router.navigate([route]);
  }
  checkUser = async (email: string, pw: string) => {
    const userExists = await this.service.checkUserExist(email, pw);
    this.validLogin(userExists);
  };

  validLogin(check: boolean) {
    if (check) {
      return this.login();
    }
    console.log('passwordWrong');
  }
  loginGuest() {
    this.login();
  }
}
