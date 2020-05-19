import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../models/User.model';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];
  userSubsscription: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userSubsscription = this.userService.userSubject.subscribe(
      (users: User[])=>{
        this.users = users;
      }
    );
    this.userService.emitUsers();
  }

  ngOnDestroy(){
    this.userSubsscription.unsubscribe();
  }

}
