import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GeneralServiceTsService } from 'src/app/services/general.service.ts.service';
import * as CryptoJS from 'crypto-js';
import { Global } from 'src/app/services/global';
import { Location } from '@angular/common';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css'],
})
export class ResetPassComponent implements OnInit {
  passNew: string = '';
  confirmPass: string = '';
  messageSuccess: string = '';
  messageError: string = '';

  permissions: any;

  @ViewChild('resetPass') resetPass: NgForm | any;

  constructor(
    private _generalService: GeneralServiceTsService,
    private location: Location,
    private _sharedData: SharedDataService

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
  }

  onSave() {
    if (this.passNew == this.confirmPass) {
      const encryptedPass = CryptoJS.SHA256(this.passNew).toString();

      this._generalService.resetPass(encryptedPass, Global.email).subscribe(
        (response) => {
          this.messageSuccess = response;
          this.passNew = '';
          this.confirmPass = '';

          setTimeout(() => {
            this.closeAlert();
          }, 2500);
        },
        (error) => console.log(error)
      );
    } else {
      this.messageError = 'Las contraseñas no coinciden...';

      setTimeout(() => {
        this.closeAlert();
      }, 2500);
    }
  }

  closeAlert() {
    this.messageSuccess = '';
    this.messageError = '';

    this._sharedData.messageSuccess(this.messageSuccess);
    this._sharedData.messageError(this.messageError);
  }
}
