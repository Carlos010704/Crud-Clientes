import { Injectable } from '@angular/core';
import { Global } from './global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public url: string = Global.url;

  constructor(private _http: HttpClient) {}

  onLogin(mail: string, pass: string): Observable<any> {
    let params = { mail, pass };
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'onLogin', params, { headers: headers });
  }

  tokenValidate(token: any):Observable<any>{
    let params = { token };
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'tokenValidate', params, {
      headers: headers,
    });
  }

  resetPassword(mail: string):Observable<any>{
    let params = { mail };
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post( this.url + 'sendEmail', params, {headers: headers});    
  }

  getRolUser(mail: string):Observable<any>{    
    let params = { mail };
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post( this.url + 'getRolUser', params, {headers: headers});    
  }

}
