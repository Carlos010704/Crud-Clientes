import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { GeneralServiceTsService } from 'src/app/services/general.service.ts.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Global } from 'src/app/services/global';
import { Location } from '@angular/common';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css'],
})
export class GroupFormComponent implements OnInit {
  title: string = 'Nuevo Grupo';
  paramID: string = '';
  desc: string = '';

  modoEdicion: boolean = false;
  permissions: any;

  @ViewChild('groupForm') groupForm: NgForm | any;

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
      this.modoEdicion = params['modoEdicion'];

      if (this.paramID) {
        this.title = 'Editar Grupo';
        this._generalService.getRol(this.paramID).subscribe(
          (response) => {
            this.desc = response[0].description;
          },
          (error) => console.log(error)
        );
      }
    });
  }

  onSave() {
    if (this.modoEdicion) {
      this._generalService.updateRol(this.desc, this.paramID).subscribe(
        (response) => {
          this._sharedData.messageSuccess(response);
          this._router.navigate(['/menu/groups']);
        },
        (error) => {
          this._sharedData.messageError(error.error);
          this._router.navigate(['/menu/groups']);
        }
      );
    } else {
      this._generalService.addRol(this.desc).subscribe(
        (response) => {
          this._sharedData.messageSuccess(response);
          this._router.navigate(['/menu/groups']);
        },
        (error) => {
          this._sharedData.messageError(error.error);
          this._router.navigate(['/menu/groups']);

        }
      );
    }
  }

  goBack() {
    this._router.navigate(['/menu/groups']);
  }
}
