import { Component } from '@angular/core';
import { User } from '../../models/user.class';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, MatButtonModule, MatDialogModule, FormsModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatMomentDateModule],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {
  user: User = new User()
  loading = false;
  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>) {
  }
  saveUser() {

  }
}
