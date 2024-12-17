import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-no-fount',
  templateUrl: './no-fount.component.html',
  styleUrls: ['./no-fount.component.css'],
})
export class NoFountComponent implements OnInit {
  bandera: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _cookieService: CookieService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.bandera = this._route.snapshot.data['exit'];
  }

  toLogin() {
    this._cookieService.delete('access_token', '/');
    this._router.navigate(['/login']);
  }
}
