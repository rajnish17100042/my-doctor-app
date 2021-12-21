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
  
   
};
 
  
  constructor(
    private validateService:ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router:Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    const roleFromFrontend='patient'; 
    //get all the details from the backend to display on the update page
    // console.log(id);
    //try to create a single route in the backend for updation,deletion,and password change based on the roles
     this.authService.getUpdationDetails(id,roleFromFrontend).subscribe(
      data => {
       if(data.success){
          this.flashMessage.show("Displaying the updation details",{cssClass:'alert-success',timeout:3000});
          this.patient=data.result;
          console.log(this.patient);
       }
       else{
            this.flashMessage.show("Something went wrong",{cssClass:'alert-danger',timeout:3000});
            this.router.navigate(['/login']);
       }
      }
      
    );
   

  }
  
updatePatient(){
    // window.alert("Form is submitting");
    // console.log(this.name);
    
    const role='patient';
    // console.log("These are the patient details: "+this.patient.name,this.patient.email,this.patient.phone,this.patient.address,this.patient.city,this.patient.state,this.patient.pincode,this.patient.appointment_date,this.patient.symptoms,this.patient.doctor);
      //required all the fields
    if(!this.validateService.validateUpdationDetails(this.patient,role)){
      // window.alert("Please fill in all the fields");
    
      this.flashMessage.show("Please fill in all the fields",{cssClass:'alert-danger',timeout:3000});
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
