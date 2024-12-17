import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralServiceTsService } from 'src/app/services/general.service.ts.service';
import * as CryptoJS from 'crypto-js';
import { state } from '@angular/animations';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Global } from 'src/app/services/global';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  title: string = 'Nuevo Usuario';
  modoEdicion: boolean = false;

  rolIdInitial: string = '';
  rolInitial: string = '';
  shortPass: string = '';

  usuario: any = {
    name: '',
    email: '',
    password: '',
    status: false,
    rol: '-- Seleccione un Grupo --',
  };

  roles: any[] = [];
  permissions: any;

  changeToPass: boolean = false;

  constructor(
    private _generalService: GeneralServiceTsService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _sharedDate: SharedDataService,
    private location: Location
  ) {}

  ngOnInit(): void {
    // Validar permisos
    const parts = this.location.path().split('/');
    const lastPart = parts[parts.length - 1];
    const url = lastPart.split('?')[0];

    this._generalService.getPermissions(Global.idRolLogin, url).subscribe(
      (response) => {
        this.permissions = response;
      },
      (error) => console.log(error)
    );

    this._route.queryParams.subscribe((params) => {
      let paramID = params['id'];
      this.modoEdicion = params['modoEdicion'];

      if (paramID) {
        this.title = 'Editar Usuario';
        this._generalService.getUser(paramID).subscribe(
          (response) => {
            this.usuario = response[0];

            this._generalService.getRol(response[0].rol_id).subscribe((response) => {
                this.usuario.rol = response[0].description;
                this.rolIdInitial = response[0].id;
                this.rolInitial = response[0].description;
              });
          },
          (error) => console.log(error)
        );
      }

      this._generalService.getRols().subscribe(
        (response) => {
          this.roles = response;
        },
        (error) => console.log(error)
      );
    });
  }

  goBack() {
    this._router.navigate(['/menu/users']);
  }

  save() {
    if (this.usuario.status == true) {
      this.usuario.status = 1;
    } else {
      this.usuario.status = 0;
    }

    if (this.usuario.rol == this.rolInitial) {
      this.usuario.rol = this.rolIdInitial;
    }

    if (this.modoEdicion) {
      const encryptedPass = CryptoJS.SHA256(this.usuario.password).toString(); // Encriptar la contraseña
      this.usuario.password = encryptedPass; // Reasignar la contraseña al obj.

      this._generalService.updateUser(this.usuario).subscribe(
        (response) => {
          this._sharedDate.messageSuccess(response); // Enviamos el mensaje al servicio compartido
          this._router.navigate(['/menu/users']);
        },
        (error) => {
          this._sharedDate.messageError(error.error);
          this._router.navigate(['/menu/users']);
        }
      );
    } else {
      const encryptedPass = CryptoJS.SHA256(this.usuario.password).toString(); // Encriptar la contraseña
      this.usuario.password = encryptedPass; // Reasignar la contraseña al obj.

      this._generalService.addUser(this.usuario).subscribe(
        (response) => {
          this._sharedDate.messageSuccess(response);
          this._router.navigate(['/menu/users']);
        },
        (error) => {
          this._sharedDate.messageError(error.error);
          this._router.navigate(['/menu/users']);
        }
      );
    }
  }

  changePass(){
    if(this.changeToPass == true){
      this.changeToPass = false;
    } else {
      this.changeToPass = true;
      this.usuario.password = '';
    }    
  }
}
