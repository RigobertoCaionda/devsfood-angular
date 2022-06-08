import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() product: any;
  @Output() cancelBtnClicked = new EventEmitter();
  qt = 1;
  constructor() { }

  ngOnInit(): void {
  }

  handleClick(type: string) {
    if (type == '-') {
      if(this.qt > 1) {
        this.qt--;
      }
    }
    
    if (type == '+') {
      this.qt++;
    }
  }
  cancel() {
    this.cancelBtnClicked.emit('clicado');
  }
}
