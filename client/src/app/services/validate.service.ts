import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }
  validateRegistration(dataToSend,role){

    console.log("outside role if ");
    //  console.log("hello",dataToSend.specialisation,dataToSend.experience,role);

    // if role is doctor then do some extra data validation
    if(role==='doctor'){
      //console.log("hello",dataToSend.specialisation,dataToSend.experience,role);
      if(!dataToSend.specialisation||!dataToSend.experience){
        console.log("hello");
        return false;
      }

    }

    if(!dataToSend.name||!dataToSend.email||!dataToSend.phone||!dataToSend.address||!dataToSend.city||!dataToSend.state||!dataToSend.pincode||!dataToSend.joining_date||!dataToSend.password){
      return false;
    }
    if(dataToSend.password!==dataToSend.cpassword){
      return false;

    }
  

    

    else{ 
      return true;
    }
  }
  validateEmail(email){
     const re =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
     return re.test(email);
  }

}
