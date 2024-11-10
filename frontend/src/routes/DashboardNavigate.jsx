import React from 'react'
import useUser from '../hooks/useUser'
import Loader from '../components/Loader/Loader';
import { Navigate } from 'react-router-dom';

const DashboardNavigate = () => {
   const {currentUser, isLoading} = useUser()
   const role = currentUser?.role;

   if (isLoading) {
     return <Loader/>
   }

  if (role === 'admin') return <Navigate to="/dashboard/admin-home" replace />
  if (role === 'user') return <Navigate to="/dashboard/farmer-home" replace />
}

export default DashboardNavigate