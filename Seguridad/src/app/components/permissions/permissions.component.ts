import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralServiceTsService } from 'src/app/services/general.service.ts.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css'],
})
export class PermissionsComponent implements OnInit {

  permissions: any;
  viewPermissions: any;
  paramID: string = '';

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private location: Location,
    private _generalService: GeneralServiceTsService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _sharedData: SharedDataService
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
      this.paramID = params['id'];      

      this._generalService.getViewPermissions(this.paramID).subscribe(
        (response) => {
          this.viewPermissions = response;

          this.viewPermissions.forEach((perm: any) => {
            Object.keys(perm).forEach((key) => {
              if (perm[key] === 'Y' || perm[key] === 'N') {
                perm[key] = perm[key] === 'Y' ? true : false;
              }
            });
          });      
        },
        (error) => console.log(error)
      );
    });
  }

  guardarCambios(valores: []) {
    valores.forEach((perm: any) => {
      Object.keys(perm).forEach((key) => {
        if (typeof perm[key] === 'boolean') {
          perm[key] = perm[key] ? 'Y' : 'N';
        }
      });
    });

    this.viewPermissions = valores; // REASINGNAR VALORES AL ARREGLO ORIGINAL

    this._generalService
      .updatePermissions(this.paramID, this.viewPermissions)
      .subscribe((response) => {

        this.viewPermissions = response.value;
        
        this.viewPermissions.forEach((perm: any) => {
          Object.keys(perm).forEach((key) => {
            if (perm[key] === 'Y' || perm[key] === 'N') {
              perm[key] = perm[key] === 'Y' ? true : false;
            }
          });
        });

        this.successMessage = response.msj;
        setTimeout(() => {
          this.closeAlert();
        }, 2500);
        
      },
      error => {
        console.log(error);
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
