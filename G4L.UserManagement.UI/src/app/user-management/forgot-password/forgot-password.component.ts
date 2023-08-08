import { Component, OnInit } from '@angular/core';
import { GoalModalHandlerService } from 'src/app/goal-management/services/modals/goal-modal-handler.service';
import { ForgotPasswordModalComponent } from '../forgot-password-modal/forgot-password-modal.component';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private modalHandler: GoalModalHandlerService<any>
  ) {}

  getFormControl(control: String): AbstractControl {
    return this.forgotPasswordForm.controls[`${control}`];
  }

  clearFormControlErrors(): void {
    this.getFormControl('Email').setErrors(null);
  }
  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      Email: new FormControl(null, [Validators.required, Validators.email]),
    });

    // Clearing errors when making username changes
    this.getFormControl('Email').valueChanges.subscribe(() => {
      this.clearFormControlErrors();
    })

    // Clearing errors when making password changes
    this.getFormControl('Password').valueChanges.subscribe(() => {
      this.clearFormControlErrors();
    })
  }

  get isFormInvalid(): boolean {
    return this.forgotPasswordForm.invalid;
  }

  isValid(controlName: string): boolean {
    return this.forgotPasswordForm.controls[controlName].valid;
  }

  isTouched(controlName: string): boolean {
    return this.forgotPasswordForm.controls[controlName].touched;
  }
  openforgotpasswordModal(): void {
    if (this.forgotPasswordForm.valid) {
      this.modalHandler.openMdbModal<ForgotPasswordModalComponent>({
        component: ForgotPasswordModalComponent,
        data: null,
        ignoreBackdropClick: true,
        width: 50,
      });
    }
  }
}
