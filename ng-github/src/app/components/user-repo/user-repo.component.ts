import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { GithubRepo } from 'src/app/models/github-repo';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-repo',
  templateUrl: './user-repo.component.html',
  styleUrls: ['./user-repo.component.css']
})
export class UserRepoComponent implements OnInit {

  repos: GithubRepo[] = [];

  constructor(private route: ActivatedRoute, public gs: GithubService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      flatMap(params => this.gs.getRepos(params.get('repos_url')))
    ).subscribe(repos => this.repos = repos);
  }

}
