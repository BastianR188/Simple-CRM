import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, MatButtonModule, MatDialogModule, FormsModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatMomentDateModule],
  providers: [MatDatepickerModule, MatNativeDateModule, MatNativeDateModule],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  user = new User();
  birthDate!: Date;
  firestore: Firestore = inject(Firestore);
  loading = false;
  constructor() {
  }

  saveUser() {
    this.loading = true;
    if (this.birthDate instanceof Date) {
      this.user.birthDate = this.birthDate.getTime();
    } else {
      this.loading = false;
      return alert('Birth Date is no valid Date');
    }
    console.log('Current user is', this.user);


    addDoc(collection(this.firestore, 'users'), this.user.toJSON())
      .then((result: any) => {
        console.log('Added user in Firestore', result);
        this.loading = false;
      })
      .catch((error: any) => {
        console.error('Error to add user in Firestore', error);
      });

  }
}
