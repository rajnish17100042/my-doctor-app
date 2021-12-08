import { Component, OnInit } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import {ValidateService} from '../../../services/validate.service';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'flash-messages-angular';

@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.component.html',
  styleUrls: ['./admin-registration.component.css']
})
export class AdminRegistrationComponent implements OnInit {
  name:String;
  email:String;
  phone:String;
  address:String;
  city:String;
  state:String;
  pincode:String;
  joining_date:String;
  password:String;
  cpassword:String;
  


  constructor(
    private validateService:ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router:Router,
    ) { }

  ngOnInit() {
  const route='registrationRoute';
  
    //take the page from frotend and role from the backend cookie
    
     this.authService.authenticateRoute(route).subscribe(data=>{
      if(data.success){
        // console.log(data.token);
        // this.flashMessage.show("Rendering the dashboard",{cssClass:'alert-success',timeout:3000});
        // this.router.navigate(['/admin/dashboard']); by writing this will call infinite loop
      //  console.log(data.message);
       this.flashMessage.show(data.message,{cssClass:'alert-success',timeout:3000});
      }else{
        this.flashMessage.show(data.message,{cssClass:'alert-danger',timeout:3000});
         this.router.navigate(['/login']);
      }
  }); 
  }
  registerAdmin(){
    // window.alert("Form is submitting");
    // console.log(this.name);
    const dataToSend={
      name:this.name,
      email:this.email,
      phone:this.phone,
      address:this.address,
      city:this.city,
      state:this.state,
      pincode:this.pincode,
      joining_date:this.joining_date,
      password:this.password,
      cpassword:this.cpassword,
    };
    const role='admin';
    

    
      //reuired all the fields
    if(!this.validateService.validateRegistration(dataToSend,role)){
      // window.alert("Please fill in all the fields");
      this.flashMessage.show("Please fill in all the fields also both the password should match",{cssClass:'alert-danger',timeout:3000});
      return false;
    }
    //validate email
    if(!this.validateService.validateEmail(dataToSend.email)){
      // window.alert("Please enter the correct email");
      this.flashMessage.show("Please enter the correct email",{cssClass:'alert-danger',timeout:3000});
      return false;
    }

    //send admin data to the server
    this.authService.sendDataToServer(dataToSend,role).subscribe(
      data => {
       if(data.success){
          this.flashMessage.show("Admin is Registered",{cssClass:'alert-success',timeout:3000});
          this.router.navigate(['/login']);
       }
       else{
            this.flashMessage.show("Something went wrong",{cssClass:'alert-danger',timeout:3000});

       }
      }
      
    );
  }
  

}
