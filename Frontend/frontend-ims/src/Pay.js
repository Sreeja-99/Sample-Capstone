import './Pay.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Pay(){

    const navigate = useNavigate(); // Hook to navigate programmatically

    useEffect(() => {
        // Navigate to the home page after 2 seconds
        const timer = setTimeout(() => {
            navigate("/");
        }, 2000);

        // Cleanup timeout on component unmount
        return () => clearTimeout(timer);
    }, [navigate]);
    return(
        <div className="Confirmation">
            <p>Hurray, Your order is placed..!!</p>
            <p>Thanks for shopping with us..</p>
            <p>Please visit again..</p>

           
        </div>

        
    )
}
export default Pay;