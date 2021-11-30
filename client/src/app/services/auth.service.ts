import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
// import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken:any;
  user:any;
  constructor(private http:HttpClient) { }

  // registerAdmin(adminUser){
  //   let headers=new HttpHeaders();
  //   headers.append('Content-Type','application/json');
  //   return this.http.post('http://localhost:5000/admin/adminRegistration',adminUser,{headers:headers}).map(res=>res.json()); 
  // }
}
