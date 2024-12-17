import { Injectable } from '@angular/core';
import { Global } from './global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneralServiceTsService {
  public url: string = Global.url;

  constructor(private _http: HttpClient) {}

  // Restablecer contraseña
  resetPass(password: string, email: string): Observable<any> {
    let params = { password, email };
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'resetPass', params, {
      headers: headers,
    });
  }

  // Obtener permisos por rol
  getPermissions(value: {}, url: string):Observable<any>{    
    let params = { value, url };
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post( this.url + 'getPermissions', params, { headers: headers } );
  }

  // MODIFICACIÓN DE USUARIOS

  getUsers(): Observable<any> {
    return this._http.get(this.url + 'users');
  }

  getUser(id: string): Observable<any> {
    return this._http.get(this.url + `user/${id}`);
  }

  addUser(data: any[]): Observable<any> {
    let params = { data };
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'user-save', params, {
      headers: headers,
    });
  }

  updateUser(data: any[]): Observable<any> {
    let params = { data };
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'user-update', params, {
      headers: headers,
    });
  }

  userDelete(id: string): Observable<any> {
    let params = { id };
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'user-delete', params, {
      headers: headers,
    });
  }

  // MODIFICACIÓN DE ROLES

  getRols(): Observable<any> {
    return this._http.get(this.url + 'groups');
  }

  getRol(id: string): Observable<any> {
    return this._http.get(this.url + `group/${id}`);
  }

  addRol(desc: string): Observable<any> {
    let params = { desc };
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'group-save', params, {
      headers: headers,
    });
  }

  updateRol(desc: string, id: string): Observable<any> {
    let params = { desc, id };
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'group-update', params, {
      headers: headers,
    });
  }

  deleteRol(id: string): Observable<any> {
    let params = { id };
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'group-delete', params, {
      headers: headers,
    });
  }

  getViewPermissions(id: string):Observable<any>{
    return this._http.get( this.url + `getViewPermissions/${id}`);    
  }

  updatePermissions(id: string, values: []):Observable<any>{    
    let params = { id, values };
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    return this._http.post(this.url + 'updatePermissions', params, {
      headers: headers,
    });
  }

}
