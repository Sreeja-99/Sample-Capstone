import {useState} from 'react';
import RegistrationValidation from './RegistrationValidation.js';
import { useNavigate } from 'react-router-dom';
function Register(){
    
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState(''); 
  const [message, setMessage] = useState(''); 
  const navigate=useNavigate();
  

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  }

  const handleSubmit =async (event) => {
    event.preventDefault();

    const validateError=RegistrationValidation(username,email,password,confirmPassword);
    if(validateError.length>0){
        setErrors(validateError);
        setMessage('');
         return;
    }else{
      try {
        const response = await fetch("http://localhost:8080/registration", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: username,
                emailId: email,
                password: password,
                confirmPassword: confirmPassword
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to register.");
        }
        setErrors('');
        const data = await response.json();
        setMessage("Registration successful!");
        console.log(data);

        setTimeout(() => {
          navigate("/login");
      }, 2000);
  
    } catch (error) {
        console.error("Failed to register. Error:", error);
        setErrors('');
        setMessage('');
        setErrors([error.message]);
    }
    }
  };
        
//         setMessage("Details are registered..!!");
//         setErrors('');
//         setTimeout(()=>{
//             navigate("/");
//         },10000);
//     }catch{
//         setMessage("Please try after some time");
//     }
        
//     }

//  };

 

  return (
     <form onSubmit={handleSubmit}>
    {/* <form> */}
    <div className="Login">

    <div className="logo-app">
        <img className="logo" src="https://png.pngtree.com/png-clipart/20240312/original/pngtree-simple-color-graphic-drawing-with-black-outline-of-paper-bags-from-png-image_14568401.png"/>
        <h1 className="title">Register to College Store-Demo</h1>
    </div>
      <div>
        <label>Name:</label>
        <input type="text" value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        <label>Email id:</label>
        <input type="email" value={email} onChange={handleEmailChange} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
      </div>
      <button className="login_button" type="submit">Register</button>

      <div className="error">
      {errors && errors.map((err)=>
        <p>{err}</p>
      )}
      </div>


      <div className="success">
      {message && <div>{message}</div>}
      </div>

      </div>
    </form>
  )

}

export default Register;

