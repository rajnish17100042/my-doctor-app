import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AdminRegistrationComponent } from './components/admin/admin-registration/admin-registration.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { DoctorDashboardComponent } from './components/doctor/doctor-dashboard/doctor-dashboard.component';
import { AppointmentDetailsComponent } from './components/doctor/appointment-details/appointment-details.component';
import { VisitedPatientsComponent } from './components/doctor/visited-patients/visited-patients.component';
import { DoctorRegistrationComponent } from './components/admin/doctor-registration/doctor-registration.component';
import { PatientRegistrationComponent } from './components/admin/patient-registration/patient-registration.component';
import { UpdatePatientComponent } from './components/admin/update-patient/update-patient.component';
import { UpdateDoctorComponent } from './components/admin/update-doctor/update-doctor.component';
import { UpdateAdminComponent } from './components/admin/update-admin/update-admin.component';
import { UpdatePatientPasswordComponent } from './components/admin/update-patient-password/update-patient-password.component';
import { UpdateDoctorPasswordComponent } from './components/admin/update-doctor-password/update-doctor-password.component';
import { UpdateAdminPasswordComponent } from './components/admin/update-admin-password/update-admin-password.component';
const routes: Routes = [
  // routing for the common login page 
  {
   path:'login',
   component:LoginComponent,
  },
  // routing for the Home page 
  // { 
  //   path: '',
  //  redirectTo: '/home',
  //  pathMatch: 'full'
  //  },

  {
   path: '',
   component: HomeComponent
  },
   // routing for the admin dashboard 
  {
   path:'admin/dashboard',
   component:AdminDashboardComponent,
  },
    // routing for the doctor dashboard 
  {
   path:'doctor/dashboard',
   component:DoctorDashboardComponent,
  },
    // routing for the appointment details shown to doctor
  {
   path:'doctor/dashboard/appointment-details',
   component:AppointmentDetailsComponent,
  },
    // routing to get the details of all visited patients
  {
   path:'doctor/dashboard/visited-patients',
   component:VisitedPatientsComponent,
  },
   // routing for the admin registration by super admin 
  {
   path:'admin/admin-registration',
   component:AdminRegistrationComponent,
  },
   // routing for the doctor registration by admin 
  {
   path:'admin/doctor-registration',
   component:DoctorRegistrationComponent,
  },
   // routing for the patient registration by admin 
  {
   path:'admin/patient-registration',
   component:PatientRegistrationComponent,
  },
   // routing to update patient registration details 
  {
   path:'update-patient/:id',
   component:UpdatePatientComponent,
  },
   // routing to update doctor registration details 
  {
   path:'update-doctor/:id',
   component:UpdateDoctorComponent,
  },
   // routing to update admin registration details 
  {
   path:'admin/update-admin/:id',
   component:UpdateAdminComponent,
  },
   // routing to update patient password
  {
   path:'update-patient-password/:id',
   component:UpdatePatientPasswordComponent,
  },
   // routing to update doctor password
  {
   path:'update-doctor-password/:id',
   component:UpdateDoctorPasswordComponent,
  },
   // routing to update admin password
  {
   path:'admin/update-admin-password/:id',
   component:UpdateAdminPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents=[LoginComponent,HomeComponent,AdminRegistrationComponent,DoctorDashboardComponent,AppointmentDetailsComponent,VisitedPatientsComponent,DoctorRegistrationComponent,PatientRegistrationComponent,UpdatePatientComponent,UpdateDoctorComponent,UpdateAdminComponent,UpdatePatientPasswordComponent,UpdateDoctorPasswordComponent,UpdateAdminPasswordComponent]