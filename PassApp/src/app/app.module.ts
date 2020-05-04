import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { OneTimePassModule } from './one-time-pass/one-time-pass.module';

import { AppComponent } from './app.component';

import { OneTimePassService } from './one-time-pass.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    OneTimePassModule
  ],
  providers: [
      OneTimePassService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
