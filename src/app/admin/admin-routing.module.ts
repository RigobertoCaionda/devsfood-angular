import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Teste2Component } from '../views/teste2/teste2.component';

const routes: Routes = [
  {
    path: '',
    component: Teste2Component
    // Verificar ao ativar rotas filhas depois
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
