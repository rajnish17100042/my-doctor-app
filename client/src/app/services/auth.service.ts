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

  sendDataToServer(dataToSend,role){
    let headers=new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post<any>('/registration/'+role,dataToSend,{headers:headers})

  }

   authenticateUser(user){
    let headers=new HttpHeaders();
    headers.append('Content-Type','application/json');
    headers.append( "credentials", "include");
    return this.http.post<any>('/login',user,{headers:headers,})
   }

 //admin dashboard protection  
 authenticateRoute(route){
    let headers=new HttpHeaders();
    headers.append('Content-Type','application/json');
    headers.append( "credentials", "include");
    return this.http.get<any>('/'+route,{headers:headers,})
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

 updateRegistrationDetails(dataToSend,role){
    let headers=new HttpHeaders();
    headers.append('Content-Type','application/json');
    headers.append( "credentials", "include");
    return this.http.post<any>('/updateRegistrationDetails/'+role+'/'+dataToSend.id,dataToSend,{headers:headers,})
   }
   
logout(){
    let headers=new HttpHeaders();
    headers.append('Content-Type','application/json');
    headers.append( "credentials", "include");
    return this.http.get<any>('/logout',{headers:headers,})
   }




}
