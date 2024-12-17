import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/services/login.ts.service';
import * as CryptoJS from 'crypto-js';
import { NgForm } from '@angular/forms';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { GeneralServiceTsService } from 'src/app/services/general.service.ts.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  mail: string = 'mauripacheco2004@gmail.com';
  password!: string;

  loginMessageError: string = '';
  mailMessageSuccess: string = '';
  mailMessageError: string = '';

  constructor(
    private _loginService: LoginService,
    private _cookieService: CookieService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _sharedDate: SharedDataService,
    private _generalService: GeneralServiceTsService,
    private _sharedData: SharedDataService
  ) {}

  ngOnInit(): void {
    this.loginMessageError = this._sharedDate.returnSesionMessage();

    if (this.loginMessageError) {
      setTimeout(() => {
        this.closeAlert();
      }, 2500);
    }
  }

  @ViewChild('loginForm') loginForm: NgForm | any;
  @ViewChild('resetForm') resetForm: NgForm | any;

  onLogin() {
    const encryptedData = CryptoJS.SHA256(this.password).toString(
      CryptoJS.enc.Hex
    );

    this._loginService.onLogin(this.mail, encryptedData).subscribe(
      (response) => {
        this._cookieService.set(
          'access_token',
          response.access_token,
          1/24,
          '/'
        );
        this._loginService.getRolUser(this.mail).subscribe(
          (response) => {
            Global.idRolLogin = response[0];
            Global.email = this.mail;
            this._router.navigate(['/menu']);
          },
          (error) => console.log(error)
        );
      },
      (error) => {
        this.loginMessageError = error.error;

        setTimeout(() => {
          this.closeAlert();
        }, 3000);
      }
    );
  }

  resetPass() {
    this._loginService.resetPassword(this.mail).subscribe(
      (response) => {
        this.mailMessageSuccess = response;

        setTimeout(() => {
          this.closeAlert();
          // window.location.reload();
        }, 2500);
      },
      (error) => {
        this.mailMessageError = error.error;

        setTimeout(() => {
          this.closeAlert();
        }, 2500);
      }
    );
  }

  // Limpiamos el campo mail al cambiar de vista Login/ Reset Password
  cleanMail() {
    this.mail = '';
    this.password = '';
  }

  // Eliminamos la alerta
  closeAlert() {
    this.loginMessageError = '';
    this.mailMessageSuccess = '';
    this.mailMessageError = '';
  }
}
