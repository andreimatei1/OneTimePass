import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { OneTimePassService } from '../one-time-pass.service';

const ONE_SECOND = 1000;

@Component({
  selector: 'app-one-time-pass',
  templateUrl: './one-time-pass.component.html',
  styleUrls: ['./one-time-pass.component.scss']
})
export class OneTimePassComponent implements OnDestroy {
  passForm: FormGroup;
  totalSeconds = 30;
  secondsInterval: any;
  pass: string;
  passFormDisabled = false;

  constructor(
    private fb: FormBuilder,
    private oneTimePassService: OneTimePassService
  ) {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.cleanUp();
  }

  generateOneTimePass() {
    if (this.passForm.invalid) {
      this.passForm.markAllAsTouched();
      return;
    }

    this.disableForm();

    this.oneTimePassService.getOneTimePass(
      this.passForm.value.userId
    ).subscribe(resp => {
      this.pass = resp;
      this.oneTimePassService.remainingSecondsForOneTimePass(
        this.passForm.value.userId, resp
      ).subscribe(resp => {
        this.startTimerCountDown(resp);
      })
    }, _ => {
      this.enableForm();
    });
  }

  private startTimerCountDown(seconds) {
    this.totalSeconds = seconds;
    this.secondsInterval = setInterval(() => {
      this.totalSeconds -= 1;
      if (this.totalSeconds === 0) {
        this.cleanUp();
      }
    }, ONE_SECOND);
  }

  private initForm() {
    this.passForm = this.fb.group({
      userId: ''
    });
  }

  private disableForm() {
    this.passFormDisabled = true;
    this.passForm.controls['userId'].disable();
  }

  private enableForm() {
    this.passFormDisabled = false;
    this.passForm.controls['userId'].enable();
  }

  private cleanUp() {
    clearInterval(this.secondsInterval);
    this.enableForm();
  }
}
