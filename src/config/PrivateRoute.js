import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import LogoutTimer from './LogoutTimer';

const PrivateRoute = ({children}) => {
    const navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem("token")){
            navigate("/")
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.clear()
        navigate("/")
      };
  
  return (
    <div>
        <LogoutTimer logout={handleLogout} />
            {children}
    </div>
  )
}

export default PrivateRoute