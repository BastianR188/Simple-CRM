import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MyServiceService } from '../firestore.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';


@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  user: User = new User();


  constructor(private service: MyServiceService, private route: ActivatedRoute) {
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
}
