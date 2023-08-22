import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { UserService } from '../services/user.service';

import { GoalModalHandlerService } from 'src/app/goal-management/services/modals/goal-modal-handler.service';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';

import { ToastrService } from 'ngx-toastr';
import { ServerErrorCodes } from 'src/app/shared/global/server-error-codes';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  keys = Object.keys;

  serverErrorMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private modalHandler: GoalModalHandlerService<any>
  ) {}

  getFormControl(control: String): AbstractControl {
    return this.signupForm.controls[`${control}`];
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      Name: ['', [Validators.required, this.noSpecialCharacters]],
      Surname: ['', [Validators.required, this.noSpecialCharacters]],
      Email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
      Password: [
        '',
        [Validators.required, Validators.minLength(8),Validators.maxLength(128), this.passwordValidator],
      ],
      confirmPassword: ['', Validators.required],
    });
  }

  get isFormInvalid(): boolean {
    return this.signupForm.invalid;
  }

  isValid(controlName: string): boolean {
    return this.signupForm.controls[controlName].valid;
  }

  isTouched(controlName: string): boolean {
    return this.signupForm.controls[controlName].touched;
  }

// Clear the server error message
  clearServerError() {
    this.serverErrorMessage = ''; 
  }

  noSpecialCharacters(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const pattern = /^[a-zA-Z ]*$/;
    return pattern.test(control.value) ? null : { specialCharacters: true };
  }

  areEmailsMatching(): boolean {
    const email = this.signupForm.get('Email')?.value;
    const confirmEmail = this.signupForm.get('confirmEmail')?.value;
    return email === confirmEmail;
  }

  passwordValidator(control: { value: string }) {
    const pattern = /^(?=.*[!@#$%^&*])(?=.*[A-Z])/;
    return pattern.test(control.value) ? null : { passwordInvalid: true };
  }
  
  arePasswordsMatching(): boolean {
    const password = this.signupForm.get('Password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;
    return password === confirmPassword;
  }

  serverErrorHandling(error: any) {
    if (error && error.errorCode === ServerErrorCodes.DuplicateEmail) {
      this.signupForm.controls['Email'].setErrors({
        duplicateEmailError: true,
      });
      this.serverErrorMessage = error.message;
    }
    this.signupForm.updateValueAndValidity();
  }

  signupUser(): void {
    this.signupForm.markAllAsTouched();

    if (this.signupForm.invalid) {
      // If the form is invalid, return early and do not proceed with signup
      return;
    }
    // backend logic here
    this.userService.signupUser(this.signupForm.value).subscribe(
      (response) => {
        if (!this.serverErrorMessage) {
          this.openSignUpModal();
        }
      },
      (error) => {
        this.serverErrorHandling(error);
      }
    );
  }

  openSignUpModal(): void {
    if (
      this.signupForm.valid &&
      this.arePasswordsMatching() &&
      this.areEmailsMatching()
    ) {
      this.modalHandler.openMdbModal<SignupModalComponent>({
        component: SignupModalComponent,
        data: null,
        ignoreBackdropClick: true,
        width: 50,
      });
    }
  }
}
