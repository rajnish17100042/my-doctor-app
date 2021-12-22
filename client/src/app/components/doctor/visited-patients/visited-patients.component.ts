import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../../services/validate.service';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'flash-messages-angular';


@Component({
  selector: 'app-visited-patients',
  templateUrl: './visited-patients.component.html',
  styleUrls: ['./visited-patients.component.css']
})
export class VisitedPatientsComponent implements OnInit {
  visitedPatients:Object;
   constructor(
    private validateService:ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router:Router,
    ) { }

    ngOnInit(){
    this.authService.getVisitedPatients().subscribe(data=>{
      if(data.success){
        // console.log(data);
        this.visitedPatients=data.results;
        
       }else{
        this.flashMessage.show(data.message,{cssClass:'alert-danger',timeout:3000});
         this.router.navigate(['/login']);
      }
    }); 
  }

}
