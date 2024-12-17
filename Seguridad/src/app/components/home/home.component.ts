import { Component, Input, OnInit } from '@angular/core';
import { GeneralServiceTsService } from 'src/app/services/general.service.ts.service';
import { Global } from 'src/app/services/global';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  permissions: any;

  constructor(
    private _generalService: GeneralServiceTsService,
    private location: Location,
    private _router: Router
  ) {}

  ngOnInit(): void {
    // Validar permisos
    const parts = this.location.path().split('/');
    const url = parts[parts.length - 1];

    this._generalService.getPermissions(Global.idRolLogin, url).subscribe(
      (response) => {
        this.permissions = response;
        if (this.permissions.perm_access == 'N') {
          this._router.navigate(['menu/users']);
        }
      },
      (error) => console.log(error)
    );
  }
}
