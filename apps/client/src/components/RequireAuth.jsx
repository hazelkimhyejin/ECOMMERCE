import { Outlet, Navigate } from "react-router-dom"
import useAuthDetails from "../hooks/useAuthDetails"

const RequireAuth = () => {

  const { name } = useAuthDetails()

  return (
    <>
        
        
        {name ? <Outlet /> : <Navigate to="/login" />}
        
    </>
    
  )
}

export default RequireAuth