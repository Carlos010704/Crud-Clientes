import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../services/login.ts.service';
import { SharedDataService } from '../services/shared-data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private _cookieService: CookieService,
    private _router: Router,
    private _loginService: LoginService,
    private _sharedData: SharedDataService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    let flag;
    const token = this._cookieService.get('access_token');

    this._loginService.tokenValidate(token).subscribe(
      (response) => {
        flag = response.status;

        if (!flag) {
          this._sharedData.messageSesion('Su sesión a expirado...');
          this._router.navigate(['login']);
        }
      },
      (error) => console.log(error)
    );

    return true;
  }
}
