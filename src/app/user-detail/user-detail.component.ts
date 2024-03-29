import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MyServiceService } from '../firestore.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.class';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
  providers: [DialogEditAddressComponent, DialogEditUserComponent],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  user: User = new User();
  id: any;
  neueBildquelle: string = '';
  constructor(
    private service: MyServiceService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}
  @ViewChild('imagePic') imagePic!: ElementRef;

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.id = paramMap.get('id');
      this.getUserData(this.id);
      this.loadimg(this.id);
    });
  }

  changeImage() {
    this.imagePic.nativeElement.src = this.neueBildquelle;
  }

  loadimg(id: string) {
    let img = new Image();
    img.src = './assets/img/' + id + '.jpg';
    img.onerror = () => {
      return console.log('Image does not exist');
    };
    img.onload = () => {
      this.imagePic.nativeElement.src = img.src;
    };
  }

  deleteUser(userId: string) {
    this.service.delete(userId);
    this.router.navigate(['/user']);
  }

  async getUserData(userId: string) {
    let data = await this.service.getUser(userId);
    this.user = new User(data);
  }

  editMenu(edit: string) {
    let dialog = this.edit(edit);
    if (dialog) {
      dialog.componentInstance.user = new User(this.user);
      dialog.componentInstance.userId = this.id;
      dialog.afterClosed().subscribe((result) => {
        if (result) this.user = result;
      });
    }
  }

  edit(edit: string) {
    if (edit == 'user') {
      return this.dialog.open(DialogEditUserComponent);
    } else return this.dialog.open(DialogEditAddressComponent);
  }
}
