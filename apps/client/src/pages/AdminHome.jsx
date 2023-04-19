import { Link } from "react-router-dom"

const AdminHome = () => {
  return (
    <>
      
      <div className="text-sm breadcrumbs">
        <ul>
          <li><Link to="/adminhome">Admin</Link></li>                    
        </ul>
      </div>  

      <div className="text-2xl mb-2">Admin Home</div>

      <Link to="/adminlistings">
        <button className="btn btn-wide btn-primary my-2 mx-2">View Listings</button>
      </Link>      

      {/* <Link to="/adminlistings"> */}
        <button className="btn btn-wide btn-primary my-2 mx-2">Edit WhatsApp Messages</button>
      {/* </Link>       */}
      

    </>
  )
}

export default AdminHome