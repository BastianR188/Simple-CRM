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
  sortProberty = 'firstName';
  sortOrder = 'asc';
  constructor(
    private service: MyServiceService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.service.load();
  }

  sortBy(proberty: string) {
    if (this.sortProberty == proberty) {
      return (this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc');
    }
    return (this.sortProberty = proberty);
  }

  getAllUsers() {
    this.sortByProperty(this.sortProberty, this.sortOrder);
    return this.service.allDataUsers;
  }

  private sortByProperty(property: string, sortOrder: string) {
    this.service.allDataUsers.sort((a: any, b: any) => {
      const comparison =
        a[property] > b[property] ? 1 : a[property] < b[property] ? -1 : 0;
      return sortOrder === 'desc' ? comparison * -1 : comparison;
    });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

  goToUser(userId: string) {
    this.router.navigate(['/user', userId]);
  }
}
