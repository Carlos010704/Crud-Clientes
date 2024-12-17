import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UsersComponent } from './components/users/users.component';
import { MenuComponent } from './components/menu/menu.component';
import { GroupsComponent } from './components/groups/groups.component';
import { GroupFormComponent } from './components/group-form/group-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { NoFountComponent } from './components/no-fount/no-fount.component';

import { JwtModule } from "@auth0/angular-jwt";
import { ResetPassComponent } from './components/reset-pass/reset-pass.component';
import { ErrorComponent } from './alerts/error/error.component';
import { SuccessComponent } from './alerts/success/success.component';
import { SuccessLoginComponent } from './alerts/success-login/success-login.component';
import { ErrorLoginComponent } from './alerts/error-login/error-login.component';
import { NoAccessComponent } from './components/no-access/no-access.component';
import { PermissionsComponent } from './components/permissions/permissions.component';
import { SearchPermissionsComponent } from './components/search-permissions/search-permissions.component';

// ...


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    MenuComponent,
    GroupsComponent,
    GroupFormComponent,
    UserFormComponent,
    HomeComponent,
    LoginComponent,
    NoFountComponent,
    ResetPassComponent,
    ErrorComponent,
    SuccessComponent,
    SuccessLoginComponent,
    ErrorLoginComponent,
    NoAccessComponent,
    PermissionsComponent,
    SearchPermissionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SweetAlert2Module.forRoot(),
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem("access_token");
        }
      }
    })
  ],
  providers: [AuthGuard, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
