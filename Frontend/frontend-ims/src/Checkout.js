import { useState } from "react";
import CheckoutValidation from "./CheckoutValidation";
import { useNavigate } from "react-router-dom";
function Checkout({clear,c}){

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [address,setAddress]=useState('');
    const [error, setError] = useState('');
    const navigate=useNavigate();

    const handleUsernameChange=(event)=>{
        setUsername(event.target.value);

    }
    const handleEmailChange=(event)=>{
        setEmail(event.target.value);

    }
    const handleAddressChange=(event)=>{
        setAddress(event.target.value);

    }

    const handleOnClick=()=>{
   
        if(c.length>0){
        
        const validateError=CheckoutValidation(username,email,address);
        if(validateError.length>0){
            setError(validateError);
            return;
        }else{
            clear();
            sessionStorage.removeItem("cart");
            navigate("/pay");
        }
    }else{
        setError("Please add the items to cart before proceeding with payment..");
    }
    }
    return(
        <div className="Login">

        <div className="logo-app">
            <img className="logo" src="https://png.pngtree.com/png-clipart/20240312/original/pngtree-simple-color-graphic-drawing-with-black-outline-of-paper-bags-from-png-image_14568401.png"/>
            <h1 className="title">Please proceed to pay..</h1>
        </div>
        <div>
            <label>Name:</label>
            <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
            <label>Address:</label>
            <input type="text" value={address} onChange={handleAddressChange} />
        </div>
        <button className="login_button" type="submit" onClick={handleOnClick}>Pay</button>

        {/* <div className="error">
        {error && error.map((err)=>
        <p>{err}</p>
        )}*/}

        <div className="error">
            {error && <p>{error}</p>}
        </div>
        </div>

       

        
    );

}
export default Checkout;