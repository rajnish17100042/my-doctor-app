import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AdminRegistrationComponent } from './components/admin/admin-registration/admin-registration.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { DoctorRegistrationComponent } from './components/admin/doctor-registration/doctor-registration.component';
import { PatientRegistrationComponent } from './components/admin/patient-registration/patient-registration.component';
import { UpdatePatientComponent } from './components/admin/update-patient/update-patient.component';
import { UpdateDoctorComponent } from './components/admin/update-doctor/update-doctor.component';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents=[LoginComponent,HomeComponent,AdminRegistrationComponent,DoctorRegistrationComponent,PatientRegistrationComponent,UpdatePatientComponent,UpdateDoctorComponent]