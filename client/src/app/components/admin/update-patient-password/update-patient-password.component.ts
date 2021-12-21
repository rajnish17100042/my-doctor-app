import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../../services/validate.service';
import {AuthService} from '../../../services/auth.service';
import {Router,ActivatedRoute} from '@angular/router';
import {FlashMessagesService} from 'flash-messages-angular';

@Component({
  selector: 'app-update-patient-password',
  templateUrl: './update-patient-password.component.html',
  styleUrls: ['./update-patient-password.component.css']
})
export class UpdatePatientPasswordComponent implements OnInit {
   public password={
   currentPassword:String,
   newPassword:String,
   confirmNewPassword:String
};
  
    constructor(
    private validateService:ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router:Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
  }

  updatePatientPassword(){
    // window.alert("Form is submitting");
    // console.log(this.name);
    const id = this.route.snapshot.params['id'];
    console.log(id);
    const role='patient';
    
      //required all the fields
    if(!this.validateService.validatePassword(this.password)){
      // window.alert("Please fill in all the fields");
    
      this.flashMessage.show("Please fill in all the fields",{cssClass:'alert-danger',timeout:3000});
      return false;
    }
   

    //send  data to the server
    this.authService.updatePassword(this.password,role,id).subscribe(
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
