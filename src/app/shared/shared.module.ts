import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './layouts/notfound/notfound.component';
import { ModalComponent } from './layouts/modal/modal.component';
import { NumberFormatterPipe } from './pipes/number-formatter.pipe';
import { ErrorComponent } from './layouts/error/error.component';
import { TranslateModule } from '@ngx-translate/core';
import { CreatePproductFormComponent } from './layouts/create-pproduct-form/create-pproduct-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateRoleComponent } from './layouts/create-category/create-role.component';
import { EditProductFormComponent } from './layouts/edit-product-form/edit-product-form.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';



@NgModule({
  declarations: [
    NotfoundComponent,
    ModalComponent,
    NumberFormatterPipe,
    ErrorComponent,
    CreatePproductFormComponent,
    CreateRoleComponent,
    EditProductFormComponent,
    DeleteProductComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  exports: [
    ModalComponent,
    ErrorComponent
  ]
})
export class SharedModule { }
