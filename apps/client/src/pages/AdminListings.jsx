import AdminCategoryCard from "../components/AdminCategoryCard";
import { useQuery } from 'react-query'
import { getAllCategories } from "../api/category";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const AdminListings = () => {

  const { isLoading, isError, data, error } = useQuery(
    ['categories'], getAllCategories)

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  // console.log(data)
  const categoryCards = data?.map(cat => {
    return(
      <AdminCategoryCard 
      key={cat.id}
      name={cat.name}
      imgUrl={cat.imgUrl}
      catId={cat.id}
    />
    )
    
  })

    return (
      
      <>
        <div className="text-sm breadcrumbs">
          <ul>
            <li><Link to="/adminhome">Admin</Link></li> 
            <li><Link to="/adminlistings">Listings</Link></li> 
            <li>Categories</li>                     
          </ul>
        </div>
        <div className="text-2xl mb-2">Admin - Categories</div>

        <button className="btn btn-wide my-2">Add Category</button>

        <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {data ? categoryCards : "Server error"}
        </div>       

      </>
    )
}

export default AdminListings