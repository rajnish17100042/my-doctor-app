import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }
  validateAdminRegistration(adminUser){
    if(!adminUser.name||!adminUser.email||!adminUser.phone||!adminUser.address||!adminUser.city||!adminUser.state||!adminUser.pincode||!adminUser.joining_date||!adminUser.password){
      return false;
    }
    else if(adminUser.password!==adminUser.cpassword){
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
