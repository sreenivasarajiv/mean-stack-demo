import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserRepoComponent } from './components/user-repo/user-repo.component';


const routes: Routes = [
  {
    path: '',
    component: UserListComponent
  },
  {
    path: 'repos/:repos_url',
    component: UserRepoComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
