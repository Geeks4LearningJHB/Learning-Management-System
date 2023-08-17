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
import { CustomValidators } from 'src/app/shared/validators/custom-validators';

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

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      Email: new FormControl(null, [Validators.required, CustomValidators.email]),
    });

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
