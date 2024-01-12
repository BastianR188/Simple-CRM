import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MyServiceService } from '../firestore.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  user: User = new User();


  constructor(private service: MyServiceService, private route: ActivatedRoute, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      let id = paramMap.get('id');
      if (id) {
        this.user = this.service.allDataUsers.find(user => user.id === id);
        if (this.user == undefined) {
          this.getUserData(id);
        }
      }

    })
  }

  async getUserData(userId: string) {
    let data = await this.service.getUser(userId);
    this.user = new User(data);
    console.log(this.user);
  }

  EditTitleMenu() {
    this.dialog.open(DialogEditUserComponent);
  }

  EditAdressMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = this.user;
  }
}
