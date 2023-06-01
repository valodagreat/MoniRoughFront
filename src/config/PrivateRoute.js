import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import LogoutTimer from './LogoutTimer';
import { useQueryClient } from '@tanstack/react-query';

const PrivateRoute = ({children}) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    useEffect(()=>{
        if(!localStorage.getItem("token")){
            queryClient.clear(); // Clear all queries
            queryClient.removeQueries(); // Remove all queries from the cache
            navigate("/");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token")
        queryClient.clear(); // Clear all queries
        queryClient.removeQueries(); // Remove all queries from the cache
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