import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule,RoutingComponents } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';


import { NavbarComponent } from './components/navbar/navbar.component';

import {ValidateService}from './services/validate.service';
import {AuthService}from './services/auth.service';
import { FlashMessagesModule } from 'flash-messages-angular';
import { HomeComponent } from './components/home/home.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { RegistrationDetailsComponent } from './components/admin/registration-details/registration-details.component';
import { UpdatePatientComponent } from './components/admin/update-patient/update-patient.component';
import { UpdatePatientPasswordComponent } from './components/admin/update-patient-password/update-patient-password.component';
import { DeletePatientComponent } from './components/admin/delete-patient/delete-patient.component';
import { UpdateDoctorComponent } from './components/admin/update-doctor/update-doctor.component';
import { UpdateAdminComponent } from './components/admin/update-admin/update-admin.component';
import { UpdateDoctorPasswordComponent } from './components/admin/update-doctor-password/update-doctor-password.component';
import { UpdateAdminPasswordComponent } from './components/admin/update-admin-password/update-admin-password.component';
import { DoctorDashboardComponent } from './components/doctor/doctor-dashboard/doctor-dashboard.component';
import { AppointmentDetailsComponent } from './components/doctor/appointment-details/appointment-details.component';
import { VisitedPatientsComponent } from './components/doctor/visited-patients/visited-patients.component';
import { PatientDashboardComponent } from './components/patient/patient-dashboard/patient-dashboard.component';
import { PatientAppointmentComponent } from './components/patient-appointment/patient-appointment.component';
import { AppointmentRequestComponent } from './components/admin/appointment-request/appointment-request.component';




@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    NavbarComponent,
    HomeComponent,
    AdminDashboardComponent,
    RegistrationDetailsComponent,
    UpdatePatientComponent,
    UpdatePatientPasswordComponent,
    DeletePatientComponent,
    UpdateDoctorComponent,
    UpdateAdminComponent,
    UpdateDoctorPasswordComponent,
    UpdateAdminPasswordComponent,
    DoctorDashboardComponent,
    AppointmentDetailsComponent,
    VisitedPatientsComponent,
    PatientDashboardComponent,
    PatientAppointmentComponent,
    AppointmentRequestComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    HttpClientModule,
  ],
  providers: [ValidateService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
