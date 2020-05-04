import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { OneTimePassComponent } from './one-time-pass.component';
import { TimerComponent } from '../timer/timer.component';
import { ValidateOtpComponent } from '../validate-otp/validate-otp.component';
import { OneTimePassService } from '../one-time-pass.service';
import { MaterialModule } from '../material/material.module';
import { of } from 'rxjs';

describe('OneTimePassComponent', () => {
  let component: OneTimePassComponent;
  let fixture: ComponentFixture<OneTimePassComponent>;
  let timerFixture: ComponentFixture<TimerComponent>;
  let validateOtpFixture: ComponentFixture<ValidateOtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OneTimePassComponent,
        TimerComponent,
        ValidateOtpComponent
      ],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule
      ],
      providers: [
        { provide: OneTimePassService, useClass: OneTimePassServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneTimePassComponent);
    timerFixture = TestBed.createComponent(TimerComponent);
    validateOtpFixture = TestBed.createComponent(ValidateOtpComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the initial totalSeconds to 30', () => {
    const totalSeconds = fixture.componentInstance.totalSeconds;

    expect(totalSeconds).toBe(30);
  });

  it('updates the pass with the response from the oneTimePassService', () => {
    fixture.componentInstance.passForm.controls['userId'].setValue('111111');
    fixture.componentInstance.generateOneTimePass();
    expect(fixture.componentInstance.pass).toBe('123456');
  });

  it('updates the totalSeconds with the response from the oneTimePassService', () => {
    fixture.componentInstance.passForm.controls['userId'].setValue('111111');
    fixture.componentInstance.generateOneTimePass();
    expect(fixture.componentInstance.totalSeconds).toBe(22);
  });
});

class OneTimePassServiceMock {
  getOneTimePass(userId: string) {
    return of('123456');
  }

  remainingSecondsForOneTimePass(userId: string, otp: string) {
    return of(22);
  }
}