import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'flash-messages-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:String;
  password:String;
  role:String;

   constructor(
    private validateService:ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router:Router,
    ) { }

  ngOnInit(): void {
  }

login(){
  // console.log(this.email);
  const user={
    email:this.email,
    password:this.password,
    role:this.role,
  }
  
     //required all the fields
    if(!this.validateService.validateLoginData(user)){
      // window.alert("Please fill in all the fields");
      this.flashMessage.show("Please fill in all the fields correctly",{cssClass:'alert-danger',timeout:3000});
      return false;
    }
    //validate email
    if(!this.validateService.validateEmail(user.email)){
      // window.alert("Please enter the correct email");
      this.flashMessage.show("Please enter the correct email",{cssClass:'alert-danger',timeout:3000});
      return false;
    }

  this.authService.authenticateUser(user).subscribe(data=>{
      if(data.success){
        console.log(data.token);
        this.flashMessage.show("Successfully Logged In",{cssClass:'alert-success',timeout:3000});
        this.router.navigate(['/']);
      }else{
        this.flashMessage.show(data.message,{cssClass:'alert-danger',timeout:3000});
      }
  });

  }



}
