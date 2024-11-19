import './Header.css'; 
import Cart from './Cart.js';

import { Link } from 'react-router-dom';
import Logout from './Logout.js';

function Header({cart,login}){
    const handleLogout=()=>{
        console.log('Link clicked!');
        // sessionStorage.setItem('status',"false");
         sessionStorage.clear();
    }
    // const isLoggedIn=sessionStorage.getItem("status")==="false";
    

   
    return(
       <header className="head"> 
            <div className="logo-appName">
                <img className="logo" src="https://png.pngtree.com/png-clipart/20240312/original/pngtree-simple-color-graphic-drawing-with-black-outline-of-paper-bags-from-png-image_14568401.png"/>
                <h1>College Store-Demo</h1>
            </div>

            {/* <div className="cart"> */}
            {/* <Cart c={cart}/> */}
            <div className='cart'>
                <Link to="/cart">
                    Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
                </Link>
            </div>

            {!login?
            <div className='pre-login'>
            <Link to="/login">
                    Login 
                </Link>
            
            <Link to="/register">
                Register 
            </Link>
            </div>:
            
            <div className='post-login'>
            <Link to="/logout" onClick={handleLogout}>
                Logout 
            </Link>
            </div>}
                
            
            {/* </div> */}

        </header>
 
    );
}

export default Header;