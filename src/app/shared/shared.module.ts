import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './layouts/notfound/notfound.component';
import { ModalComponent } from './layouts/modal/modal.component';
import { NumberFormatterPipe } from './pipes/number-formatter.pipe';
import { ErrorComponent } from './layouts/error/error.component';



@NgModule({
  declarations: [
    NotfoundComponent,
    ModalComponent,
    NumberFormatterPipe,
    ErrorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalComponent,
    ErrorComponent
  ]
})
export class SharedModule { }
