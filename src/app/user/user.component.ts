import { AfterViewInit, Component, OnInit } from '@angular/core';
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
export class UserComponent implements AfterViewInit {
  constructor(
    private service: MyServiceService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.service.loadSortOrder();
    this.service.loadSortDirection();
    this.service.load();
  }

  ngAfterViewInit(): void {
    this.sortingData(this.service.sortOrder[0]);
  }

  sortByProperty(property: string) {
    this.sortByDirection(property);
    this.sortingByOrder(property);
    this.sortingData(property);
    this.service.saveOrder();
  }

  private sortingByOrder(property: string) {
    if (this.service.sortOrder[0] != property) {
      let index = this.service.sortOrder.indexOf(property);
      this.service.sortOrder.splice(index, 1);
      this.service.sortOrder.unshift(property);
    }
  }
  private sortingData(property: string) {
    this.service.allDataUsers.sort((a, b) => {
      const comparison =
        a[property].toLowerCase() > b[property].toLowerCase()
          ? 1
          : a[property].toLowerCase() < b[property].toLowerCase()
          ? -1
          : 0;

      return this.service.sortDirection.includes('asc')
        ? comparison
        : -comparison;
    });
  }

  private sortByDirection(property: string) {
    if (this.service.sortOrder[0] === property) {
      this.service.sortDirection = this.service.sortDirection.includes('asc')
        ? 'desc'
        : 'asc';
    }
  }

  getAllUsers() {
    return this.service.allDataUsers;
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
