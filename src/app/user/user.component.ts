import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatTooltipModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  user = new User();


  constructor(public dialog: MatDialog) {

  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent)
  }
}
