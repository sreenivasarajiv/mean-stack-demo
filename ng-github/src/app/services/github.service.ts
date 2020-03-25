import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators'
import { GithubUser } from '../models/github-user';
import { environment } from 'src/environments/environment';
import { GithubRepo } from '../models/github-repo';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  @BlockUI() public blockUI: NgBlockUI;

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    Authorization: environment.GITHUB_API_TOKEN,
    Accept: 'application/json'
  });

  getUsers(username?: string): Observable<GithubUser[]> {

    let api_url = 'https://api.github.com';

    if (username) {
      api_url = `${api_url}/search/users?q=${username}`;
    } else {
      api_url = `${api_url}/users`
    }

    return this.http.get<GithubUser[] | { items: GithubUser[] }>(api_url, { headers: this.headers })
      .pipe(
        map(result => {
          if ((result as { items: GithubUser[] }).items) {
            return (result as { items: GithubUser[] }).items;
          }
          return result as GithubUser[];
        })
      )
  }

  getRepos(repoUrl: string): Observable<GithubRepo[]> {
    return this.http.get<GithubRepo[]>(decodeURI(repoUrl), { headers: this.headers });
  }
}
