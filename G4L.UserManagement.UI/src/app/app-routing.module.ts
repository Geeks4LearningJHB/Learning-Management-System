import { LoginComponent } from './user-management/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './user-management/login/guards/login.guard';
import { ApplicationProgressComponent } from './user-management/application-progress/application-progress/application-progress.component';

const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'progress',
    component: ApplicationProgressComponent,
  },
  {
    path: '',
    loadChildren: () =>
      import('./master-layout/master-layout.module').then(
        (m) => m.MasterLayoutModule
      ),
    canActivate: [LoginGuard],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
