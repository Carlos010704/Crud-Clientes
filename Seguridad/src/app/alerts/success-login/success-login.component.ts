import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-success-login',
  templateUrl: './success-login.component.html',
  styleUrls: ['./success-login.component.css']
})
export class SuccessLoginComponent {
  @Input() successMessage: string = '';
  @Output() close = new EventEmitter<void>();

  closeAlert(){
    this.close.emit();
  }
}
