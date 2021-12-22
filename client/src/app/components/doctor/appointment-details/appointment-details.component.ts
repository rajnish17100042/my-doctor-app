import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../../services/validate.service';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'flash-messages-angular';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css']
})
export class AppointmentDetailsComponent implements OnInit {
  appointmentDetails:Object;
  
  constructor(
    private validateService:ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router:Router,
    ) { }

   ngOnInit(){
    this.authService.getAppointmentDetails().subscribe(data=>{
      if(data.success){
        // console.log(data);
        this.appointmentDetails=data.results;
        
       }else{
        this.flashMessage.show(data.message,{cssClass:'alert-danger',timeout:3000});
         this.router.navigate(['/login']);
      }
    }); 
  }


  updateStatus(status,id){
   
    let finalConfirmation = confirm(`are you surly want to mark it to .... ${status}`);

    if (finalConfirmation == true) {
        //  console.log(role,id);
      this.authService.updateAppointmentStatus(status,id).subscribe(
        data => {
        if(data.success){
            this.flashMessage.show(data.message,{cssClass:'alert-success',timeout:3000});
          
        }
        else{
              this.flashMessage.show(data.message,{cssClass:'alert-danger',timeout:3000});

        }
        }
      
      );
    } 
      
  }

}
