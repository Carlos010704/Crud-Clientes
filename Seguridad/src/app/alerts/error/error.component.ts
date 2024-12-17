import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent {
  @Input() errorMessage: string = '';
  @Output() close = new EventEmitter<void>();

  closeAlert() {
    this.close.emit();
  }
}
