import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import './logout.css'; 
function Logout(){
    //  sessionStorage.setItem('status',false);
    const navigate = useNavigate(); // Hook to navigate programmatically

    useEffect(() => {
        // Navigate to the home page after 2 seconds
        sessionStorage.removeItem("cart");
        const timer = setTimeout(() => {

            navigate("/login");
        }, 2000);

        // Cleanup timeout on component unmount
        return () => clearTimeout(timer);
    }, [navigate]);
    return(
        <div className="logout">
            <p>successfully logged out..!!</p>
            <p>Please visit again..</p>
        </div>

    );
}

export default Logout;