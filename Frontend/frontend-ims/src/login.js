import {useEffect, useState} from 'react';
import LoginValidation from './LoginValidation.js'
import {useNavigate} from 'react-router-dom'
import Checkout from './Checkout.js';
// import './App.css';
import './Login.css';
// import { ReactSession }  from 'react-client-session';

function Login(){
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState([]);
const [message, setMessage] = useState('');
const navigate=useNavigate();

const [isLoggedIn,setIsLoggedIn]=useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

//   const registerError = (errors)=>{
//     setError(
//         errors.map((err)=>
//           err
//         )
//       );
//   } 

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // TODO: Implement authentication API call here
//     <LoginValidation err={registerError} name={username} password={password} />
     
     
//   }

const handleSubmit =async (event) => {
    event.preventDefault();

    const validateError=LoginValidation(username,password);
    if(validateError.length>0){
        setError(validateError);
        return;
    }

//     try{

//         //const response = await fetch("/success.json");
//         const response = await fetch("http://localhost:8080/login", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 name: username,
//                 password: password,
//             }),
//         });
//        // const data = await response.json();

//         if (!response.ok) {
//             const errorData = await response.json();
//            // setError("Failed to login.");
//             throw new Error(errorData.message || "Failed to login.");
//         }else{
        
//         // if (data.status === "success") {
//             const data = await response.json();
//         setMessage("Login success..!!");
//         setError([]);

//         setTimeout(()=>{
//             navigate("/");
//         },2000);
        
//         setIsLoggedIn(true);
//       //  localStorage.setItem('isLoggedIn',true);

//         sessionStorage.setItem('name',username);
//         sessionStorage.setItem('password',password);
//          sessionStorage.setItem('status',true);

//         // ReactSession.set("name",username);
//         // ReactSession.set("password",password);
//         // ReactSession.set('status',true);



//     }
//     // else{
//     //     setMessage("Incorrect userid or password");
//     // }
//     return;

//     }catch{
//         setMessage(`please try after some time. `);
//     }

//  };
try {
    const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    });

    // Parse response JSON once
    const responseData = await response.json();

    if (!response.ok) {
        // Use the parsed response data
        setError([]);
        throw new Error(responseData.message || "Failed to login.");
    }

    // Handle success
    setMessage("Login success..!!");
    setError([]);
    setIsLoggedIn(true);

    sessionStorage.setItem("name", username);
    sessionStorage.setItem("password", password);
    sessionStorage.setItem("status", true);

    // Redirect after a delay
    setTimeout(() => {
        navigate("/");
    }, 2000);

} catch (error) {
    // Display error message
    setError([]);
    setError([error.message]);
    // setError({error.message});
    // //setError(` ${error.message}`);
}
}; 
    return(
    <form onSubmit={handleSubmit}>
    {/* // <form> */}
    <div className="Login">

      <div className="logo-app">
        <img className="logo" src="https://png.pngtree.com/png-clipart/20240312/original/pngtree-simple-color-graphic-drawing-with-black-outline-of-paper-bags-from-png-image_14568401.png"/>
        <h1 className="title">Login to College Store-Demo</h1>
    </div>

    <div className='details'>
      <div>
        <label>Email:</label>
        <input type="email" value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
      </div>
      <button className="login_button" type="submit">Login</button>
      </div>

    <div className="error">
      {error && error.map((err)=>
      <p>{err}</p>
      )}
    </div>

    <div className="success">
      {message && <p>{message}</p>}
      </div>
</div>
    </form>
   );
 }
 
//     <form onSubmit={handleSubmit}>
//     {/* // <form> */}
//     <div className="Login">

//       <div className="logo-app">
//         <img className="logo" src="https://png.pngtree.com/png-clipart/20240312/original/pngtree-simple-color-graphic-drawing-with-black-outline-of-paper-bags-from-png-image_14568401.png"/>
//         <h1 className="title">Login to College Store-Demo</h1>
//     </div>

//     <div className='details'>
//       <div>
//         <label>Username:</label>
//         <input type="text" value={username} onChange={handleUsernameChange} />
//       </div>
//       <div>
//         <label>Password:</label>
//         <input type="password" value={password} onChange={handlePasswordChange} />
//       </div>
//       <button type="submit">Login</button>
//       </div>

//     <div className="error">
//       {error && error.map((err)=>
//       <p>{err}</p>
//       )}
//     </div>

//     <div className="success">
//       {message && <p>{message}</p>}
//       </div>
// </div>
//     </form>
   
 // );


export default Login;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
// import validateLogin from "./LoginValidation";

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState([]);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate(); // Initialize navigate hook

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Perform validation
//     const validationErrors = validateLogin(username, password);
//     if (validationErrors.length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     // Simulate sending to the backend by fetching the success.json
//     try {
//       const response = await fetch("/success.json");
//       const data = await response.json();

//       if (data.status === "success") {
//         setMessage("Login successful!");
//         setErrors([]);

//         // Redirect to home page after 2 seconds
//         setTimeout(() => {
//           navigate("/"); // Redirect to the home page
//         }, 2000); // 2 seconds delay
//       } else {
//         setMessage("Login failed.");
//       }
//     } catch (error) {
//       console.error("Error fetching login status:", error);
//       setMessage("Error logging in.");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username:</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>

//       {/* Display validation errors */}
//       {errors.length > 0 && (
//         <div style={{ color: "red" }}>
//           <h4>Errors:</h4>
//           <ul>
//             {errors.map((error, index) => (
//               <li key={index}>{error}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Display login message */}
//       {message && <div>{message}</div>}
//     </div>
//   );
// }

// export default Login;
