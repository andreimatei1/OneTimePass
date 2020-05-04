import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '../material/material.module';
import { ValidateOtpComponent } from './validate-otp.component';
import { OneTimePassService } from '../one-time-pass.service';

describe('ValidateOtpComponent', () => {
  let component: ValidateOtpComponent;
  let fixture: ComponentFixture<ValidateOtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ValidateOtpComponent],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule
      ],
      providers: [
        OneTimePassService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
