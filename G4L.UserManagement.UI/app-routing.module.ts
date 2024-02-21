import { LoginComponent } from './user-management/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './user-management/login/guards/login.guard';


const routes: Routes = [

  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
  // {
  //   path: 'learnership-application',
  //   loadChildren: () =>
  //     import('./user-management/learnership-application/learnership-application.module').then(
  //       (m) => m.LearnershipApplicationModule
  //     ),
  // },

  {
    path: '',
    loadChildren: () =>
      import('./master-layout/master-layout.module').then(
        (m) => m.MasterLayoutModule
      ),
    // canActivate: [LoginGuard],
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
export class AppRoutingModule { }
