import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './views/home/home.component';
import { NotfoundComponent } from './shared/layouts/notfound/notfound.component';
import { SigninComponent } from './views/signin/signin.component';
import { TesteComponent } from './views/teste/teste.component';
import { HasRoleGuard } from './core/guards/has-role.guard';
import { ProfileComponent } from './views/profile/profile.component';
import { UserUpdateFormComponent } from './views/profile/user-update-form/user-update-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  {
    path: 'orders',
    component: TesteComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      expectedRoles: ['administrador', 'usuario'],
    },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      expectedRoles: ['administrador', 'usuario'],
    },
  },
  {
    path: 'profile/update',
    component: UserUpdateFormComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      expectedRoles: ['administrador', 'usuario'],
    },
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((mod) => mod.AdminModule),
    canActivate: [AuthGuard, HasRoleGuard],
    canLoad: [AuthGuard],
    data: {
      expectedRoles: ['administrador'],
    },
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
