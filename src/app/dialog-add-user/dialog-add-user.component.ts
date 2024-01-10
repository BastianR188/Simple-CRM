import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { MyServiceService } from '../firestore.service';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, MatButtonModule, MatDialogModule, FormsModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatMomentDateModule],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  user = new User();
  birthDate!: Date;
  loading = false;
  constructor(private service: MyServiceService, public dialogRef: MatDialogRef<DialogAddUserComponent>) {
  }

  saveUser() {
    this.loading = true;
    if (this.birthDate instanceof Date) {
      this.user.birthDate = this.birthDate.getTime();
    } else {
      this.loading = false;
      return alert('Birth Date is no valid Date');
    }


    this.service.save(this.user)
      .then(() => {
        this.loading = false;
        this.dialogRef.close();
      })
      .catch((error: any) => {
        console.error('Error to add user in Firestore', error);
      });

  }
}
