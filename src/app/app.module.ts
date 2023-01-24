import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import localeEs from '@angular/common/locales/es'
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef}  from '@angular/material/dialog';

//Components
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from './components/shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
  {provide:LOCALE_ID,useValue:'es'},
  {provide: MatDialogRef, useValue: {}},
  {provide: MAT_DIALOG_DATA, useValue: []}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
