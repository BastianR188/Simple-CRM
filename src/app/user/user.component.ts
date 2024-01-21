import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MyServiceService } from '../firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  constructor(
    private service: MyServiceService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.service.load();
  }

  sortData() {
    this.service.allDataUsers.sort((a, b) => {
      return this.service.allDataUsers.reduce((acc, curr) => {
        if (acc !== 0) return acc;
        return (
          (a[curr] < b[curr] ? -1 : a[curr] > b[curr] ? 1 : 0) *
          (this.service.allDataUsers[curr] === 'desc' ? -1 : 1)
        );
      }, 0);
    });
  }

  sortByProperty(property: string) {
    if (this.service.sortOrder[0] === property) {
      this.service.sortDirection[property] =
        this.service.sortDirection[property] === 'asc' ? 'desc' : 'asc';
    } else {
      let index = this.service.sortOrder.indexOf(property);
      if (index > -1) {
        this.service.sortOrder.splice(index, 1);
        this.service.sortOrder.unshift(property);
      }
    }
    console.log(this.service.sortOrder);
    this.service.saveOder();
    this.sortData();
  }

  getUsers() {
    return this.service.allDataUsers;
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

  goToUser(userId: string) {
    this.router.navigate(['/user', userId]);
  }
}
