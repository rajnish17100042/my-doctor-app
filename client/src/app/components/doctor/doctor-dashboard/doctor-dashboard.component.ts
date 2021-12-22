import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../../services/validate.service';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'flash-messages-angular';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {
  // role:String;
  doctorData:Object;
  
   constructor(
    private validateService:ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router:Router,
    ) { }

  ngOnInit(){
    
    // this.role='doctor';
    //take the page from frotend and role from the backend cookie
    
     this.authService.getDoctorDashboardData().subscribe(data=>{
      if(data.success){
        // console.log(data.token);
        // this.flashMessage.show("Rendering the dashboard",{cssClass:'alert-success',timeout:3000});
        // this.router.navigate(['/admin/dashboard']); by writing this will call infinite loop
        // console.log(data.adminData);
        this.doctorData=data.doctorData;
      }else{
        this.flashMessage.show(data.message,{cssClass:'alert-danger',timeout:3000});
         this.router.navigate(['/login']);
      }
    });  
  
  }

    logout(){
     //go to backend logout route
    this.authService.logout().subscribe(
      data => {
       if(data.success){
          this.flashMessage.show(data.message,{cssClass:'alert-success',timeout:3000});
          this.router.navigate(['/login']);
       }
       else{
            this.flashMessage.show("Something went wrong",{cssClass:'alert-danger',timeout:3000});

       }
      }
      
    );
  }

}
