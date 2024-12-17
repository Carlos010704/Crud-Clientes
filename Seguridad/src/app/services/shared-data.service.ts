import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  // Mensaje de confirmación alertas
  private successMessageAlert = new Subject<string>();
  private stringMessageSuccess: string = '';

  successMessage = this.successMessageAlert.asObservable();

  // Mensaje de error alertas
  private errorMessageAlert = new Subject<string>();
  private stringMessageError: string = '';

  errorMessage = this.errorMessageAlert.asObservable();

  // Mensaje de cierre de sesión
  private sesionMessageAlert = new Subject<string>();
  private stringSesionMessage: string = '';

  messageCloseSesion = this.sesionMessageAlert.asObservable();

  // Rol del usuario que inicio sesión
  private rolInLogin = new Subject<string>();
  private stringRolInLogin: string = '';

  userRolLogin = this.rolInLogin.asObservable();

  messageSuccess(message: string) {
    this.stringMessageSuccess = message;
    this.successMessageAlert.next(message);
  }

  returnMessageSuccess() {
    return this.stringMessageSuccess;
  }

  messageError(message: string) {
    this.stringMessageError = message;
    this.errorMessageAlert.next(message);
  }

  returnMessageError() {
    return this.stringMessageError;
  }

  messageSesion(message: string) {
    this.stringSesionMessage = message;
    this.sesionMessageAlert.next(message);
  }

  returnSesionMessage() {
    return this.stringSesionMessage;
  }

  valueRolInLogin(value: string) {
    this.stringRolInLogin = value;
    this.rolInLogin.next(value);
  }

  returnRolInLogin() {
    return this.stringRolInLogin;
  }
}
