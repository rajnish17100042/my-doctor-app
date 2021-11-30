import { Component, OnInit } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import {ValidateService} from '../../../services/validate.service';
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


  constructor(private validateService:ValidateService,private flashMessage:FlashMessagesService) { }

  ngOnInit(): void {
  }
  registerAdmin(){
    // window.alert("Form is submitting");
    // console.log(this.name);
    const adminUser={
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
    }

      //reuired all the fields
    if(!this.validateService.validateAdminRegistration(adminUser)){
      // window.alert("Please fill in all the fields");
      this.flashMessage.show("Please fill in all the fields also both the password should match",{cssClass:'alert-danger',timeout:3000});
      return false;
    }
    //validate email
    if(!this.validateService.validateEmail(adminUser.email)){
      // window.alert("Please enter the correct email");
      this.flashMessage.show("Please enter the correct email",{cssClass:'alert-danger',timeout:3000});
      return false;

    }
  }
  

}
