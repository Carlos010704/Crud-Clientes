import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { GeneralServiceTsService } from 'src/app/services/general.service.ts.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Location } from '@angular/common';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
})
export class GroupsComponent implements OnInit {
  roles: any[] = [];
  permissions: any;

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private _generalService: GeneralServiceTsService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _sharedData: SharedDataService,
    private location: Location
  ) {}

  ngOnInit(): void {
    // Validar permisos
    const parts = this.location.path().split('/');
    const url = parts[parts.length - 1];

    this._generalService.getPermissions(Global.idRolLogin, url).subscribe(
      (response) => {
        this.permissions = response;
      },
      (error) => console.log(error)
    );

    // Obtener mensaje para la alerta
    this.successMessage = this._sharedData.returnMessageSuccess();
    this.errorMessage = this._sharedData.returnMessageError();

    if (this.successMessage || this.errorMessage) {
      setTimeout(() => {
        this.closeAlert();
      }, 2500);
    }

    this._generalService.getRols().subscribe(
      (response) => {
        this.roles = response;
      },
      (error) => console.log(error)
    );
  }

  eliminar(id: string) {
    this._generalService.deleteRol(id).subscribe(
      (response) => {
        this.successMessage = response;
        this.roles = this.roles.filter((e) => e.id !== id);

        setTimeout(() => {
          this.closeAlert();
        }, 2500);
      },
      (error) => {
        this.errorMessage = error.error;

        setTimeout(() => {
          this.closeAlert();
        }, 2500);
      }
    );
  }

  closeAlert() {
    this.successMessage = '';
    this.errorMessage = '';

    this._sharedData.messageSuccess(this.successMessage);
    this._sharedData.messageError(this.errorMessage);
  }
}
