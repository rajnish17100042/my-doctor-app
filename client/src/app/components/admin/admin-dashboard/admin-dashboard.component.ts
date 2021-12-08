import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../../services/validate.service';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'flash-messages-angular';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  route:String;
  name:String;

  constructor(
    private validateService:ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router:Router,
    ) { }

  ngOnInit(){
    
    this.route='adminDashboard';
    //take the page from frotend and role from the backend cookie
    
     this.authService.authenticateRoute(this.route).subscribe(data=>{
      if(data.success){
        // console.log(data.token);
        // this.flashMessage.show("Rendering the dashboard",{cssClass:'alert-success',timeout:3000});
        // this.router.navigate(['/admin/dashboard']); by writing this will call infinite loop
        console.log(this.name);
        this.name=data.adminData.name;
      }else{
        this.flashMessage.show(data.message,{cssClass:'alert-danger',timeout:3000});
         this.router.navigate(['/login']);
      }
  });  
  
  
  }

}
