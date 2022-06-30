import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './views/home/home.component';
import { NotfoundComponent } from './shared/layouts/notfound/notfound.component';
import { SigninComponent } from './views/signin/signin.component';
import { SignupComponent } from './views/signup/signup.component';
import { TesteComponent } from './views/teste/teste.component';
import { HasRoleGuard } from './core/guards/has-role.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'orders',
    component: TesteComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      expectedRoles: ['Admin', 'User'],
    },
  },
  {
    path: 'profile',
    component: TesteComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      expectedRoles: ['Admin', 'User'],
    },
  },
  {
    path: 'admin',
    loadChildren: () =>
    import('./admin/admin.module').then(
      (mod) => mod.AdminModule
    ),
    canActivate: [AuthGuard, HasRoleGuard],
    canLoad: [AuthGuard],
    data: {
      expectedRoles: ['Admin']
    }
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
