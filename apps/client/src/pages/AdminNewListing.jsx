import { useQuery } from "react-query";
import { useParams, Link } from "react-router-dom";
import { getCategoryById } from "../api/category";
import ProductNewListingForm from "../components/ProductNewListingForm";
import LoadingSpinner from "../components/LoadingSpinner";

const AdminNewListing = () => {

  const { id } = useParams()  
  
  const { isLoading, isError, data, error } = useQuery(
    ['category', id], () => getCategoryById(id), { staleTime: 20000 })

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }



  return (
    
    <>
      <div className="text-sm breadcrumbs">
          <ul>
          <li><Link to="/adminhome">Admin</Link></li> 
          <li><Link to="/adminlistings">Listings</Link></li> 
          <li><Link to="/adminlistings">Categories</Link></li> 
          <li><Link to={`/admin/cat/${data.id}`}>{data.name}</Link></li> 
          <li>New Listing</li> 
                  
          </ul>
      </div>
      
      <div className="text-2xl mb-2">New Listing: {data.name}</div>
      <ProductNewListingForm
        id={id}
      />
      

      

    </>
  )
}

export default AdminNewListing

// params: id of category
