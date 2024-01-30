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

  passwordFormControl = new FormControl('', [Validators.required]);
  nameInput = new FormControl('', [Validators.required]);
  emailInput = new FormControl('', [Validators.required, Validators.email]);
  passwordInput = new FormControl('', [Validators.required]);

  hide = true;
  signUp = false;
  account = new Account();
  signUpLoading = false;

  constructor(public service: MyServiceService, public router: Router) {
    this.emailFormControl = new FormControl(
      { value: '', disabled: this.signUpLoading },
      Validators.email
    );
    this.passwordFormControl = new FormControl(
      { value: '', disabled: this.signUpLoading },
      Validators.email
    );
  }

  login(name: string) {
    this.service.isLoggedIn = name;
    this.isLinkActive('/');
  }

  isLinkActive(route: string) {
    return this.router.navigate([route]);
  }

  checkUser = async (email: string, pw: string) => {
    this.signUpLoading = true;
    const userExists = await this.service.checkUserExist(email, pw);
    this.validLogin(userExists);
  };

  validLogin(check: any) {
    if (check) {
      this.login(check);
    }
    this.emailFormControl.setErrors({ notFound: true });
    this.passwordFormControl.setErrors({ wrong: true });

    this.signUpLoading = false;
  }

  loginGuest() {
    this.login('Guest');
  }

  signIn() {
    this.signUpLoading = true;

    if (this.account.name.length < 1) {
      this.signUpLoading = false;
      return;
    }
    if (!this.validateEmail(this.account.email)) {
      this.signUpLoading = false;
      return;
    }
    if (this.account.pw.length < 1) {
      this.signUpLoading = false;
      return;
    }

    this.service.saveAccount(this.account);

    this.account = new Account();
    this.signUpLoading = false;
    this.signUp = false;
  }

  validateEmail(email: string) {
    var re = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }
}
