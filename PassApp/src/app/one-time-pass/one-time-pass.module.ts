import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '../material/material.module';
import { TimerModule } from '../timer/timer.module';
import { ValidateOtpModule } from '../validate-otp/validate-otp.module';

import { OneTimePassService } from '../one-time-pass.service';

import { OneTimePassComponent } from './one-time-pass.component';

@NgModule({
    declarations: [
        OneTimePassComponent
    ],
    imports: [
        HttpClientModule,
        ReactiveFormsModule,
        MaterialModule,
        TimerModule,
        ValidateOtpModule
    ],
    exports: [
        OneTimePassComponent
    ]
})
export class OneTimePassModule { }