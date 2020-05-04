import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { OneTimePassService } from '../one-time-pass.service';
import { OtpValidationNotificationComponent } from './otp-validation-notification/otp-validation-notification.component';

@Component({
  selector: 'app-validate-otp',
  templateUrl: './validate-otp.component.html',
  styleUrls: ['./validate-otp.component.scss']
})
export class ValidateOtpComponent implements OnInit {
  private _userId: string;
  @Input('userId')
  set userId(value: string) {
    this._userId = value;
    if (value) {
      this.enableForm();
    } else {
      this.disableForm();
    }
  }

  @Input('otp')
  set otp(value: string) {
    this.validateForm.controls['otp'].setValue(value);
  }

  validateForm: FormGroup;
  validateFormDisabled = true;

  constructor(
    private fb: FormBuilder,
    private oneTimePassService: OneTimePassService,
    private snackBar: MatSnackBar
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.disableForm();
  }

  validateOtp() {
    if (this.validateForm.invalid) {
      this.validateForm.markAllAsTouched();
      return;
    }

    this.oneTimePassService.remainingSecondsForOneTimePass(
      this._userId,
      this.validateForm.value.otp
    ).subscribe(resp => {
      this.snackBar.openFromComponent(OtpValidationNotificationComponent, {
        duration: 30000,
        data: resp > 0 ? true : false
      })
    }, _ => {
      this.enableForm();
    });
  }

  private disableForm() {
    this.validateFormDisabled = true;
    this.validateForm.controls['otp'].disable();
  }

  private enableForm() {
    this.validateFormDisabled = false;
    this.validateForm.controls['otp'].enable();
  }

  private initForm() {
    this.validateForm = this.fb.group({
      otp: ''
    });
  }
}
