import { NgModule } from '@angular/core';

import { MaterialModule } from '../material/material.module';

import { TimerComponent } from './timer.component';

@NgModule({
    declarations: [
        TimerComponent
    ],
    imports: [
        MaterialModule
    ],
    exports: [
        TimerComponent
    ]
})
export class TimerModule { }