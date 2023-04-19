import { Outlet, Navigate } from "react-router-dom"
import useAuthDetails from "../hooks/useAuthDetails"

const RequireAdmin = () => {

  const { role } = useAuthDetails()

  return (
    <>
        
        
        {role==="admin" ? <Outlet /> : <Navigate to="/login" />}
    </>
    
  )
}

export default RequireAdmin