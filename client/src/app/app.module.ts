import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule,RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorRegistrationComponent } from './components/admin/doctor-registration/doctor-registration.component';
import { PatientRegistrationComponent } from './components/admin/patient-registration/patient-registration.component';





@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    DoctorRegistrationComponent,
    PatientRegistrationComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
