import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent {
  @Input('deletingRes') deletingRes: number = -1;
  @Output() userInput = new EventEmitter<string>();

  isDeleting = false;

  sendEvent(event: string){
    this.userInput.emit(event);
  }

}
