import {useState} from 'react';
function LoginValidation(name,password){
    // // const [error, setError] = useState([]);
    // return(
    //     <>
    //     <p>Entered</p>
    //     setError(
    //         (!{name})?(err.name)="Name required";
    //     )
    //     setError(
    //         (!{password})?(err.password)="Password required";
    //     )
        
    //         {/* setError({name}.length<2){
    //             setError(error.name)="Name should have atleast 2 characters"

    //         } */}

    //         {/* if(!{password}){
    //             setError(error.password)="password required";
    //         }else if(password.length<2){
    //             setError(error.password)="Password should have atleast 5 characters";
    //         } */}
    //     </>

    // );

    const error=[]
    if(!(name && password))
        error.push("Please enter details");
    else{
        if(password && password.length<6)
            error.push("Password should have atleast 6 characters");
    }
    

    return error;

}

export default LoginValidation;