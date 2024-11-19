import { useState } from "react";
function CheckoutValidation(name,email,address){
    const error=[];

     if(!(name && email && address)){
        error.push("Please enter all details");
     }else{
        if(!name)
            error.push("Name is required");
        else if(!(email))
            error.push("Email is required");
        else if(!(address))
            error.push("Address is required");
        else{
            if(!((email.includes("gmail.com")) || (email.includes("mail.uc.edu")) || (email.includes("outlook.com")) || (email.includes("yahoo.com"))))
                error.push("Enter valid email address");
            else if(address.length<10)
                    error.push("Address should be minimum 10 characters");
            else if(sessionStorage.getItem("name")!=email)
                error.push("Enter registered email");

        }
     }  

    
    // if(!(name)){
    //     error.push("Please enter name");
    // }
    return error;
}

export default CheckoutValidation;