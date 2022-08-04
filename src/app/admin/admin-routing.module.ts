import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePproductFormComponent } from '../shared/layouts/create-pproduct-form/create-pproduct-form.component';
import { CreateRoleComponent } from '../shared/layouts/create-role/create-role.component';
import { SignupComponent } from '../views/signup/signup.component';
import { TesteComponent } from '../views/teste/teste.component';

const routes: Routes = [
  {
    path: '',
    component: TesteComponent
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
    path: 'new_role',
    component: CreateRoleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
