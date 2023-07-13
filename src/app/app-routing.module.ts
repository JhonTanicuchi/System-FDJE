import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { LoginGuard } from './auth/guards/login.guard';
import { NotFoundComponent } from './errors/404/404.component';
import { FormularioComponent } from './feature/public-forms/formulario/formulario.component';
import { SuccessComponent } from './feature/public-forms/formulario/success/success.component';
import { SuccessGuard } from './feature/public-forms/formulario/success/success.guard';

const routes: Routes = [
  { path: 'registro/formulario', component: FormularioComponent },
  {
    path: 'registro/exitoso',
    canActivate: [SuccessGuard],
    component: SuccessComponent,
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', canActivate: [LoginGuard], component: LoginComponent },
    ],
  },
  {
    path: 'system',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: 'feature',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./feature/feature.module').then((m) => m.FeatureModule),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
