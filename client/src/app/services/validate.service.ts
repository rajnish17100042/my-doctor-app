import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }
  validateRegistration(dataToSend,role){
// if role is patient then do some extra data validation
    if(role==='patient' && (!dataToSend.appointment_date||!dataToSend.symptoms||!dataToSend.doctor)){
      // console.log("patient role");
     return false;
    }

    // if role is doctor then do some extra data validation
    if(role==='doctor' && (!dataToSend.specialisation||!dataToSend.experience||!dataToSend.joining_date)){
      // console.log("doctor role");
    return false;
    }

    if(!dataToSend.name||!dataToSend.email||!dataToSend.phone||!dataToSend.address||!dataToSend.city||!dataToSend.state||!dataToSend.pincode||!dataToSend.password){
      // console.log("normal checking");
      return false;
    }
    if(dataToSend.password!==dataToSend.cpassword){
      // console.log("password checking");
      return false;
    }
  
    else{ 
      // console.log("else part");
      return true;
    }
  }

// function to validate the data filled in the update page  
validateUpdationDetails(dataToSend,role){
// if role is patient then do some extra data validation

    if(role==='patient' && (!dataToSend.appointment_date||!dataToSend.symptoms||!dataToSend.doctor)){
      // console.log("patient role");
     return false;
    }

    // if role is doctor then do some extra data validation
    if(role==='doctor' && (!dataToSend.specialisation||!dataToSend.experience||!dataToSend.joining_date)){
      // console.log("doctor role");
    return false;
    }

    if(!dataToSend.name||!dataToSend.email||!dataToSend.phone||!dataToSend.address||!dataToSend.city||!dataToSend.state||!dataToSend.pincode){
      // console.log("normal checking");
      return false;
    }
    
  
    else{ 
      // console.log("else part");
      return true;
    }
  }


  // function to validate password details
    validatePassword(password){
      console.log(password);
     if(!password.currentPassword||!password.newPassword||password.confirmNewPassword){
      // console.log("user checking");
      return false;
     }//else if(!(password.newPassword===password.confirmNewPassword)){
    //   return false;
    // }
  
    else if(password.newPassword===password.confirmNewPassword){ 
      // console.log("else part");
      return true;
    }
  }


  validateLoginData(user){
     if(!user.password||!user.role){
      // console.log("user checking");
      return false;
    }
  
    else{ 
      // console.log("else part");
      return true;
    }
  }
  validateEmail(email){
     const re =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
     return re.test(email);
  }

}
