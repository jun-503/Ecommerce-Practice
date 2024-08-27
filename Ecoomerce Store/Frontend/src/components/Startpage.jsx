import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Start = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        navigate('/products')
        
    }, [navigate]);

    return (
        
        <>
        </>
    );  
};

export default Start