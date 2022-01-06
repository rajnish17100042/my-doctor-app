import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../../services/validate.service';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'flash-messages-angular';

@Component({
  selector: 'app-appointment-request',
  templateUrl: './appointment-request.component.html',
  styleUrls: ['./appointment-request.component.css']
})
export class AppointmentRequestComponent implements OnInit {
  appointmentRequests:Object;
  constructor(
    private validateService:ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router:Router,
    ) { }

 ngOnInit(){
    this.authService.getAppointmentRequests().subscribe(data=>{
      if(data.success){
        // console.log(data);
        this.appointmentRequests=data.results;
        
       }else{
        this.flashMessage.show(data.message,{cssClass:'alert-danger',timeout:3000});
         this.router.navigate(['/login']);
      }
    }); 
  }

    handleAppointmentRequest(status,id){
   
    let finalConfirmation = confirm(`are you surly want to mark it to .... ${status} ?`);

    if (finalConfirmation == true) {
         console.log("Sending Request to the server"); 
      // this.authService.handleAppointmentRequests(status,id).subscribe(
      //   data => {
      //   if(data.success){
      //       this.flashMessage.show(data.message,{cssClass:'alert-success',timeout:3000});
          
      //   }
      //   else{
      //         this.flashMessage.show(data.message,{cssClass:'alert-danger',timeout:3000});

      //   }
      //   }
      
      // );
    } 
      
  }

}
