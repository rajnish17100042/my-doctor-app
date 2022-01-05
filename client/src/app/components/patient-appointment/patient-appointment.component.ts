import { Component, OnInit } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'flash-messages-angular';

@Component({
  selector: 'app-patient-appointment',
  templateUrl: './patient-appointment.component.html',
  styleUrls: ['./patient-appointment.component.css']
})
export class PatientAppointmentComponent implements OnInit {
  name:String;
  email:String;
  phone:String;
  address:String;
  city:String;
  state:String;
  pincode:String;
  appointment_date:String;
  symptoms:String;
  doctor:String;
  password:String;
  cpassword:String;
  doctorsList=[];

  constructor(
    private validateService:ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router:Router,
    ) { }
  
  ngOnInit(){
     this.authService.getDoctorsList().subscribe(data=>{
      if(data.success){
       this.doctorsList=data.doctorsList;
       console.log(this.doctorsList);
      }else{
        this.flashMessage.show(data.message,{cssClass:'alert-danger',timeout:3000});
         this.router.navigate(['/login']);
      }
  }); 
  }

  bookAppointment(){
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
      appointment_date:this.appointment_date,
      symptoms:this.symptoms,
      doctor:this.doctor,
      password:this.password,
      cpassword:this.cpassword,
    };
    const role='patient';

      //required all the fields
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

    //send doctor data to the server
    this.authService.bookAppointment(dataToSend).subscribe(
      data => {
       if(data.success){
          this.flashMessage.show(data.message,{cssClass:'alert-success',timeout:3000});
          this.router.navigate(['/login']);
       }
       else{
            this.flashMessage.show(data.message,{cssClass:'alert-danger',timeout:3000});

       }
      }
      
    );
  }

}
