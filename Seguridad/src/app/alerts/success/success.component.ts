import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent {

  @Input() successMessage: string = '';
  @Output() close = new EventEmitter<void>();

  closeAlert(){
    this.close.emit();
  }

}
