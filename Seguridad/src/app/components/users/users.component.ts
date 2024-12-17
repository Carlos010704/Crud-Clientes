import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralServiceTsService } from 'src/app/services/general.service.ts.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Global } from 'src/app/services/global';
import { Location } from '@angular/common';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  usuarios: any[] = [];
  permissions: any;

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private _generalService: GeneralServiceTsService,
    private _route: ActivatedRoute,
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

    this._generalService.getUsers().subscribe(
      (response) => {
        this.usuarios = response;
      },
      (error) => console.log(error)
    );
  }

  eliminar(id: string) {
    this._generalService.userDelete(id).subscribe(
      (response) => {
        this.successMessage = response;
        this.usuarios = this.usuarios.filter((e) => e.id !== id);

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

  // Eliminamos la alerta
  closeAlert() {
    this.successMessage = '';
    this.errorMessage = '';

    this._sharedData.messageSuccess(this.successMessage);
    this._sharedData.messageError(this.errorMessage);
  }
}
