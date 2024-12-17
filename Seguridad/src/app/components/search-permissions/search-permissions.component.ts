import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralServiceTsService } from 'src/app/services/general.service.ts.service';
import { Global } from 'src/app/services/global';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-permissions',
  templateUrl: './search-permissions.component.html',
  styleUrls: ['./search-permissions.component.css'],
})
export class SearchPermissionsComponent implements OnInit {
  
  permissions: any;
  roles: any[] = [];
  selectedRol: string = '';

  nameRol: string = ''

  @ViewChild('valueForm') valueForm: NgForm | any;

  constructor(
    private _generalService: GeneralServiceTsService,
    private location: Location,
    private _router: Router
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

    this._generalService.getRols().subscribe(
      (response) => {
        this.roles = response;
        this.selectedRol = this.roles[0].id;
        this.nameRol = this.roles[0].description
      },
      (error) => console.log(error)
    );
  }

  onSearch() {
    this._router.navigate(['menu/assignamentPerm'], { queryParams: { id: this.valueForm.value.rol } })
  }
}
