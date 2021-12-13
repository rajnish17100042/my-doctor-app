import { Component, OnInit } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import {ValidateService} from '../../../services/validate.service';
import {AuthService} from '../../../services/auth.service';
import {Router,ActivatedRoute} from '@angular/router';
import {FlashMessagesService} from 'flash-messages-angular';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css']
})
export class UpdatePatientComponent implements OnInit {
 public patient={
   id:'',
   name:'',
   email:'',
   phone:'',
   address:'',
   city:'',
   state:'',
   pincode:'',
   appointment_date:'',
   symptoms:'',
   doctor:'',
   password:'',

 };
 

  constructor(
    private validateService:ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router:Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    const params = this.route.snapshot.params['id'] 
    //get all the details from the backend to display on the update page
    console.log(params['id']);
  }
  
updatePatient(){
    // window.alert("Form is submitting");
    // console.log(this.name);
    
    const role='patient';

      //required all the fields
    if(!this.validateService.validateRegistration(this.patient,role)){
      // window.alert("Please fill in all the fields");
      this.flashMessage.show("Please fill in all the fields also both the password should match",{cssClass:'alert-danger',timeout:3000});
      return false;
    }
    //validate email
    if(!this.validateService.validateEmail(this.patient.email)){
      // window.alert("Please enter the correct email");
      this.flashMessage.show("Please enter the correct email",{cssClass:'alert-danger',timeout:3000});
      return false;
    }

    //send doctor data to the server
    this.authService.updateRegistrationDetails(this.patient,role).subscribe(
      data => {
       if(data.success){
          this.flashMessage.show("Appointment Successful",{cssClass:'alert-success',timeout:3000});
          this.router.navigate(['/login']);
       }
       else{
            this.flashMessage.show("Something went wrong",{cssClass:'alert-danger',timeout:3000});

       }
      }
      
    );
  }

}
