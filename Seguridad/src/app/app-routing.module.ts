import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { UsersComponent } from './components/users/users.component';
import { GroupsComponent } from './components/groups/groups.component';
import { GroupFormComponent } from './components/group-form/group-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { NoFountComponent } from './components/no-fount/no-fount.component';
import { ResetPassComponent } from './components/reset-pass/reset-pass.component';
import { SearchPermissionsComponent } from './components/search-permissions/search-permissions.component';
import { PermissionsComponent } from './components/permissions/permissions.component';

const menuRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'userForm', component: UserFormComponent, canActivate: [AuthGuard] },
  { path: 'groups', component: GroupsComponent, canActivate: [AuthGuard] },
  {
    path: 'groupForm',
    component: GroupFormComponent,
    canActivate: [AuthGuard],
  },
  { path: 'permissions', component: SearchPermissionsComponent },
  { path: 'assignamentPerm', component: PermissionsComponent },
  {
    path: 'resetPass',
    component: ResetPassComponent,
    canActivate: [AuthGuard],
  },
];

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  {
    path: 'menu',
    component: MenuComponent,
    children: menuRoutes,
  },
  { path: '**', component: NoFountComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
