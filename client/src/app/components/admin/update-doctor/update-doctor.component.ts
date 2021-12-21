import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../../services/validate.service';
import {AuthService} from '../../../services/auth.service';
import {Router,ActivatedRoute} from '@angular/router';
import {FlashMessagesService} from 'flash-messages-angular';

@Component({
  selector: 'app-update-doctor',
  templateUrl: './update-doctor.component.html',
  styleUrls: ['./update-doctor.component.css']
})
export class UpdateDoctorComponent implements OnInit {
 public doctor={
   name:'',
   email:'',
   phone:'',
   address:'',
   city:'',
   state:'',
   pincode:'',
   joining_date:'',
   specialisation:'',
   experience:'',
  
   
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
    const roleFromFrontend='doctor'; 
    //get all the details from the backend to display on the update page
    // console.log(id);
    //try to create a single route in the backend for updation,deletion,and password change based on the roles
     this.authService.getUpdationDetails(id,roleFromFrontend).subscribe(
      data => {
       if(data.success){
          this.flashMessage.show("Displaying the updation details",{cssClass:'alert-success',timeout:3000});
          this.doctor=data.result;
          console.log(this.doctor);
       }
       else{
            this.flashMessage.show("Something went wrong",{cssClass:'alert-danger',timeout:3000});
            this.router.navigate(['/login']);
       }
      }
      
    );
   

  }

  updateDoctor(){
    // window.alert("Form is submitting");
    // console.log(this.name);
    
    const role='doctor';
    
      //required all the fields
    if(!this.validateService.validateUpdationDetails(this.doctor,role)){
      // window.alert("Please fill in all the fields");
    
      this.flashMessage.show("Please fill in all the fields",{cssClass:'alert-danger',timeout:3000});
      return false;
    }
    //validate email
    if(!this.validateService.validateEmail(this.doctor.email)){
      // window.alert("Please enter the correct email");
      this.flashMessage.show("Please enter the correct email",{cssClass:'alert-danger',timeout:3000});
      return false;
    }

    //send doctor data to the server
    this.authService.updateRegistrationDetails(this.doctor,role).subscribe(
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
