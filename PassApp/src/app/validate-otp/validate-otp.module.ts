import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { ValidateOtpComponent } from './validate-otp.component';
import { OtpValidationNotificationComponent } from './otp-validation-notification/otp-validation-notification.component';

@NgModule({
    declarations: [
        ValidateOtpComponent,
        OtpValidationNotificationComponent
    ],
    imports: [
        HttpClientModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    exports: [
        ValidateOtpComponent
    ]
})
export class ValidateOtpModule { }