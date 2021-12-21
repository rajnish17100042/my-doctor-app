import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../../services/validate.service';
import {AuthService} from '../../../services/auth.service';
import {Router,ActivatedRoute} from '@angular/router';
import {FlashMessagesService} from 'flash-messages-angular';

@Component({
  selector: 'app-update-admin-password',
  templateUrl: './update-admin-password.component.html',
  styleUrls: ['./update-admin-password.component.css']
})
export class UpdateAdminPasswordComponent implements OnInit {
  public password={
   currentPassword:'',
   newPassword:'',
   confirmNewPassword:'',
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

 updateAdminPassword(){
    // window.alert("Form is submitting");
    // console.log(this.name);
    const id = this.route.snapshot.params['id'];
    // console.log(id);
    const role='admin';
    // console.log(this.password,this.password.currentPassword,this.password.newPassword,this.password.confirmNewPassword);
      //required all the fields
    if(!this.validateService.validatePassword(this.password)){
      // window.alert("Please fill in all the fields");
    
      this.flashMessage.show("Please fill in all the fields and Both the password should match",{cssClass:'alert-danger',timeout:3000});
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
