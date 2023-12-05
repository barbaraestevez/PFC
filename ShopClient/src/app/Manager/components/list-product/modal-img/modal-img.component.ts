import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-img',
  templateUrl: './modal-img.component.html',
  styleUrls: ['./modal-img.component.css']
})
export class ModalImgComponent {
  @Input() titleModal:string='';
  @Input() preview:string='';
  

}
