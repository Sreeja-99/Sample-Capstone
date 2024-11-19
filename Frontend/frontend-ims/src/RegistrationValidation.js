function RegistrationValidation(username,email,password,confirmPassword){
    
    const error=[]
    if(!(username && email && password && confirmPassword))
        error.push("Please enter all the details");
     else{
      if(username.length<2)
          error.push("Name should contain atleast 2 characters");
        
      if(username.length<2)
        error.push("Name should be minimum 2 characters");
      if(password.length<5)
          error.push("Password should contain atleast 5 characters")
      
      if(password!==confirmPassword)
        error.push("Password and confirm password are mismatched");

      if(!((email.includes("gmail.com")) || (email.includes("mail.uc.edu")) || (email.includes("outlook.com")) || (email.includes("yahoo.com"))))
          error.push("Enter valid email address");

      
    } 
    return error;
   }
    
    export default RegistrationValidation;



  