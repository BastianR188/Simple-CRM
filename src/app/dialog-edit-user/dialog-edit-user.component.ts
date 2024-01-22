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
import { MyServiceService } from '../firestore.service';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss',
})
export class DialogEditUserComponent {
  user: User = new User();
  userId: string | undefined;
  loading = false;
  responsivMobile = true;

  constructor(
    private service: MyServiceService,
    public dialogRef: MatDialogRef<DialogEditUserComponent>
  ) {
    this.onResizeWindow();
  }
  onResizeWindow() {
    if (window.innerWidth < 650) {
      this.responsivMobile = false;
    }
  }
  onResizeAddUser(event: any) {
    if (event.target.innerWidth < 650) {
      this.responsivMobile = false;
    } else {
      this.responsivMobile = true;
    }
  }
  saveUser() {
    this.loading = true;
    if (this.userId) this.service.update(this.userId, this.user);
    this.loading = false;
    this.dialogRef.close(this.user);
  }
}
