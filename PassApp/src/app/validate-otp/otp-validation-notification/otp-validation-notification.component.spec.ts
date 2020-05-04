import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpValidationNotificationComponent } from './otp-validation-notification.component';
import { MaterialModule } from 'src/app/material/material.module';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

describe('OtpValidationNotificationComponent', () => {
  let component: OtpValidationNotificationComponent;
  let fixture: ComponentFixture<OtpValidationNotificationComponent>;

  beforeEach(async(() => {
    const spyMatSnackBarData = jasmine.createSpyObj('MatSnackBarData', ['data']);

    TestBed.configureTestingModule({
      declarations: [ OtpValidationNotificationComponent ],
      imports: [
        MaterialModule
      ],
      providers: [
        { provide: MAT_SNACK_BAR_DATA, useValue: [spyMatSnackBarData] }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpValidationNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
