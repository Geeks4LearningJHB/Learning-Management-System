import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MaterialModule } from '../shared/material/material.module';
import { PipesModule } from '../shared/pipes/pipes.module';
import { EnrolComponent } from './enrol/enrol.component';
import { FooterComponent } from './login/footer/footer.component';
import { IconsComponent } from './login/icons/icons.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserManagementComponent } from './user-management.component';
import { SignupComponent } from './signup/signup.component';
import { SignupModalComponent } from './signup-modal/signup-modal.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';




@NgModule({
  declarations: [
    UserManagementComponent,
    LoginComponent,
    SignupComponent,
    SignupModalComponent,
    RegisterComponent,
    EnrolComponent,
    IconsComponent,
    FooterComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MdbModalModule,
    PipesModule,
    MaterialModule,
  ],
})
export class UserManagementModule {}
