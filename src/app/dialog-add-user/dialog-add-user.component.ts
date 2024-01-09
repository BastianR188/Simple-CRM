import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, FormsModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatMomentDateModule],
  providers: [
    MatDatepickerModule, MatNativeDateModule, MatNativeDateModule
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  user = new User();
  birthDate!: Date;


  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current user is', this.user)
  }
}
