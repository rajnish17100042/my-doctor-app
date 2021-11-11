import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminRegistrationComponent } from './components/admin/admin-registration/admin-registration.component';
import { DoctorRegistrationComponent } from './components/admin/doctor-registration/doctor-registration.component';
const routes: Routes = [
  // routing for the common login page 
  {
   path:'login',
   component:LoginComponent,
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents=[LoginComponent,AdminRegistrationComponent]