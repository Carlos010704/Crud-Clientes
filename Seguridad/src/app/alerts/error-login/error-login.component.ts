import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-login',
  templateUrl: './error-login.component.html',
  styleUrls: ['./error-login.component.css'],
})
export class ErrorLoginComponent {
  @Input() errorMessage: string = '';
  @Output() close = new EventEmitter<void>();

  closeAlert() {
    this.close.emit();
  }
}
