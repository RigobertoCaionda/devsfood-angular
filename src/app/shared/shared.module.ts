import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './layouts/notfound/notfound.component';
import { ModalComponent } from './layouts/modal/modal.component';



@NgModule({
  declarations: [
    NotfoundComponent,
    ModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalComponent
  ]
})
export class SharedModule { }
