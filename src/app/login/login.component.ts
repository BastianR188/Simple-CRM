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
import { Account } from '../../models/account.class';
import { MatProgressBarModule } from '@angular/material/progress-bar';
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
    MatProgressBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  hide = true;
  signUp = false;
  account = new Account
  signUpLoading = false;
  constructor(public service: MyServiceService, public router: Router) {}
  login(name: string) {
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

  validLogin(check: any) {
    if (check) {
      this.login(check);
    }
  }
  loginGuest() {
    this.login('Guest');
  }
  signIn() {
    this.signUpLoading = true;
    // this.service.saveAccount(this.account)
    console.log('name = '+ this.account.name, 'email = ' + this.account.email, 'password = ' + this.account.pw);
    this.account = new Account;
    this.signUpLoading = false;
    this.signUp = false;
  }
}
