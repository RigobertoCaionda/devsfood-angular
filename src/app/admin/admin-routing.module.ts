import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePproductFormComponent } from '../shared/layouts/create-pproduct-form/create-pproduct-form.component';
import { CreateRoleComponent } from '../shared/layouts/create-role/create-role.component';
import { EditProductFormComponent } from '../shared/layouts/edit-product-form/edit-product-form.component';
import { SignupComponent } from '../views/signup/signup.component';
import { AdminDashboardComponent } from '../views/admin-dashboard/admin-dashboard.component';
import { DeleteProductComponent } from '../shared/delete-product/delete-product.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'new_product',
    component: CreatePproductFormComponent
  },
  {
    path: 'edit_product',
    component: EditProductFormComponent
  },
  {
    path: 'delete_product',
    component: DeleteProductComponent
  },
  {
    path: 'new_role',
    component: CreateRoleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
