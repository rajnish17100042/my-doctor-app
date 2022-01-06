import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken:any;
  user:any;
  constructor(private http:HttpClient) { }
  

//   sending the registration data of patients, doctors and admins
  sendDataToServer(dataToSend,role){
    let headers=new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post<any>('/registration/'+role,dataToSend,{headers:headers})

  }

  // sending data to login route in the backend to authenticate the user and to generate the JWT access token
   authenticateUser(user){
    let headers=new HttpHeaders();
    headers.append('Content-Type','application/json');
    headers.append( "credentials", "include");
    return this.http.post<any>('/login',user,{headers:headers,})
   }

//check if user is already logged in if so the redirect to the dashboard 
 checkAlreadyLogin(){
   let headers=new HttpHeaders();
   headers.append('Content-Type','application/json');
   headers.append( "credentials", "include");
   return this.http.get<any>('/checkAlreadyLogin',{headers:headers,})
}

 //admin dashboard protection  
 authenticateRoute(route){
    let headers=new HttpHeaders();
    headers.append('Content-Type','application/json');
    headers.append( "credentials", "include");
    return this.http.get<any>('/'+route,{headers:headers,})
   }
//doctor dashboard data 
 getDoctorDashboardData(){
    let headers=new HttpHeaders();
    headers.append('Content-Type','application/json');
    headers.append( "credentials", "include");
    return this.http.get<any>('/doctorDashboard',{headers:headers,})
   }

//get list of all doctors 
 getDoctorsList(){
    let headers=new HttpHeaders();
    headers.append('Content-Type','application/json');
    headers.append( "credentials", "include");
    return this.http.get<any>('/getDoctorsList',{headers:headers,})
   }
//patient dashboard data 
 getPatientDashboardData(){
    let headers=new HttpHeaders();
    headers.append('Content-Type','application/json');
    headers.append( "credentials", "include");
    return this.http.get<any>('/patientDashboard',{headers:headers,})
   }
//getting the appointment details for a doctor
 getAppointmentDetails(){
    let headers=new HttpHeaders();
    headers.append('Content-Type','application/json');
    headers.append( "credentials", "include");
    return this.http.get<any>('/appointmentDetails',{headers:headers,})
}
 
//book appointment with doctor
 bookAppointment(dataToSend){
    let headers=new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post<any>('/bookAppointment',dataToSend,{headers:headers})

}

//get details of appointment request and display on the admin dashboard 
 getAppointmentRequests(){
    let headers=new HttpHeaders();
    headers.append('Content-Type','application/json');
    headers.append( "credentials", "include");
    return this.http.get<any>('/appointmentRequests',{headers:headers,})
}


//updating the appointment status marked by the Doctor and changed by the patient(withdraw and book again)
updateAppointmentStatus(status,id){
    let headers=new HttpHeaders();
    headers.append('Content-Type','application/json');
    headers.append( "credentials", "include");
    return this.http.patch<any>('/updateAppointmentStatus/'+status+'/'+id,{headers:headers,})
   }

//approving or rejecting the appointment request ... it will be done by admin only
handleAppointmentRequests(status,id){
    let headers=new HttpHeaders();
    headers.append('Content-Type','application/json');
    headers.append( "credentials", "include");
    return this.http.patch<any>('/handleAppointmentRequest/'+status+'/'+id,{headers:headers,})
   }


//getting all the patients who visited the Doctor
getVisitedPatients(){
    let headers=new HttpHeaders();
    headers.append('Content-Type','application/json');
    headers.append( "credentials", "include");
    return this.http.get<any>('/visitedPatients',{headers:headers,})
   }


//calling backend routes to display all the registration details of patient,doctor and admin on the admin dashboard
 getRegistrationDetails(){
    let headers=new HttpHeaders();
    headers.append('Content-Type','application/json');
    headers.append( "credentials", "include");
    return this.http.get<any>('/registrationDetails',{headers:headers,})
   }


//routes to get the  details from the database to display on the update page
   getUpdationDetails(id,roleFromFrontend){
    let headers=new HttpHeaders();
    headers.append('Content-Type','application/json');
    headers.append( "credentials", "include");
    return this.http.get<any>('/updationDetails/'+id+'/'+roleFromFrontend,{headers:headers,})
   }

//data sending to the backend for updation of general details excluding password 
 updateRegistrationDetails(dataToSend,role){
    let headers=new HttpHeaders();
    headers.append('Content-Type','application/json');
    headers.append( "credentials", "include");
    return this.http.patch<any>('/updateRegistrationDetails/'+role+'/'+dataToSend.id,dataToSend,{headers:headers,})
   }

//data sending to the backend for password updation
 updatePassword(dataToSend,role,id){
    let headers=new HttpHeaders();
    headers.append('Content-Type','application/json');
    headers.append( "credentials", "include");
    return this.http.patch<any>('/updatePassword/'+role+'/'+id,dataToSend,{headers:headers,})
   }

//data sending to the backend to delete a user
 deleteUser(role,id){
    let headers=new HttpHeaders();
    headers.append('Content-Type','application/json');
    headers.append( "credentials", "include");
    return this.http.delete<any>('/deleteUser/'+role+'/'+id,{headers:headers,})
   }
// logging out the user   
logout(){
    let headers=new HttpHeaders();
    headers.append('Content-Type','application/json');
    headers.append( "credentials", "include");
    return this.http.get<any>('/logout',{headers:headers,})
   }




}
