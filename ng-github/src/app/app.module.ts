import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserRepoComponent } from './components/user-repo/user-repo.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserListComponent,
    UserRepoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BlockUIModule.forRoot(),
    BlockUIHttpModule.forRoot({
      blockAllRequestsInProgress: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
