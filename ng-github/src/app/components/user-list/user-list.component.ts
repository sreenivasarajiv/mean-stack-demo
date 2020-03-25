import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';
import { GithubUser } from 'src/app/models/github-user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: GithubUser[] = [];
  searchTerm: string = 'sreenivasaraj';

  constructor(public gs: GithubService) { }

  ngOnInit() {
    this.searchResult();
  }

  searchResult() {
    this.gs.getUsers(this.searchTerm.trim()).subscribe(users => this.users = users);
  }

}
