import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePproductFormComponent } from '../shared/layouts/create-pproduct-form/create-pproduct-form.component';
import { SignupComponent } from '../views/signup/signup.component';
import { Teste2Component } from '../views/teste2/teste2.component';

const routes: Routes = [
  {
    path: '',
    component: Teste2Component
    // Verificar ao ativar rotas filhas depois, só aceita se ele tiver a permissao necessaria
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'new_product',
    component: CreatePproductFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
