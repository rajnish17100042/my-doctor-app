import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule,RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorRegistrationComponent } from './components/admin/doctor-registration/doctor-registration.component';
import { PatientRegistrationComponent } from './components/admin/patient-registration/patient-registration.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import {ValidateService}from './services/validate.service';
import {AuthService}from './services/auth.service';
import { FlashMessagesModule } from 'flash-messages-angular';




@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    DoctorRegistrationComponent,
    PatientRegistrationComponent,
    NavbarComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
  ],
  providers: [ValidateService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
