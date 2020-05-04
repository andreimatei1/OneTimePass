import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-otp-validation-notification',
  templateUrl: './otp-validation-notification.component.html',
  styleUrls: ['./otp-validation-notification.component.scss']
})
export class OtpValidationNotificationComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }
}
