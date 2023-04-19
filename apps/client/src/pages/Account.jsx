import useGroupBuyStore from "../store/store";
import { useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/user"; 

const Account = () => {

  const authDetails = useGroupBuyStore((state) => state.authDetails)
  const setAuthDetails = useGroupBuyStore((state) => state.setAuthDetails)
  const role = authDetails.role
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return (
    <>
      <div className="text-sm breadcrumbs">
        <ul>
          <li><Link to="/account">Account</Link></li> 
                   
        </ul>
      </div>    

      <div className="text-lg">Hello, {authDetails.name}</div>
      
      <div className="sm:flex sm:justify-between">
      <div className="sm:flex sm:flex-col">
      {
        role === "admin" &&
        <Link to="/adminhome">
        <button className="btn btn-secondary btn-wide my-2 mx-2">Admin Page</button>
      </Link>   
      }
      </div>
         
      <div className="sm:flex sm:flex-col">
      <Link to="/orders">
        <button className="btn btn-wide btn-primary my-2 mx-2">My Orders</button>
      </Link>     
      </div> 

      <div className="sm:flex sm:flex-col">
      <Link to="/updatedetails">
        <button className="btn btn-wide my-2 mx-2">Update Account Details</button>
      </Link>
      <Link to="/updatepassword">
        <button className="btn btn-wide my-2 mx-2">Update Password</button>
      </Link>
      <button className="btn btn-wide my-2 mx-2"
        onClick={async () => {
          try {
            logout()
            setAuthDetails({})
            navigate("/")
            await queryClient.invalidateQueries('countCart') 
          } catch (error) {
            console.log(error)
          }
        }}
        >Logout</button>
      </div>
      </div>
    </>
  )
}

export default Account