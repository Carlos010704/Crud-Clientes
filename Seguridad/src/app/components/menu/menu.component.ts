import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GeneralServiceTsService } from 'src/app/services/general.service.ts.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Global } from 'src/app/services/global';
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  permissions: any;

  constructor(
    private _cookieService: CookieService,
    private _route: ActivatedRoute,
    private _generalService: GeneralServiceTsService,
    private _router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const subModulos = document.querySelectorAll('#nav-content div');

    for (let i = 0; i < subModulos.length - 1; i++) {
      let url = subModulos[i].getAttribute('routerLink') ?? '';

      this._generalService.getPermissions(Global.idRolLogin, url).subscribe(
        (response) => {
          if (response?.perm_access == 'N') {
            subModulos[i].remove();
          }
        },
        (error) => console.log(error)
      );
    }
  }

  logout() {
    this._cookieService.delete('access_token', '/');
    this._router.navigate(['/login']);
  }
}
