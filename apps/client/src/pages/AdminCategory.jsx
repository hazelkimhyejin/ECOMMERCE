import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"
import { useQuery } from "react-query";
import { countProductsByCategory } from "../api/product";
import AdminProductCard from "../components/AdminProductCard";
import LoadingSpinner from "../components/LoadingSpinner";

export const useCountProductsByCategory = (id) => useQuery(
  ['productsAdmin', id], () => countProductsByCategory(id))

const AdminCategory = () => {

  const { id } = useParams()
  
  const { isLoading, isError, data, error } = useCountProductsByCategory(id)

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  
  const category = data?.rows?.[0]?.Category?.name
  const count = data?.count
  // console.log(data)


  const productCards = data?.rows.map((item) => {
    return(
        <AdminProductCard
            imgUrl={item.imgUrl}
            name={item.name}
            price={item.price}
            date={item.createdAt}
            key={item.id}
            listed={item.listed}
            productId={item.id}
        />
    )
  })
  

  return (
    
    <>
        <div className="text-sm breadcrumbs">
            <ul>
            <li><Link to="/adminhome">Admin</Link></li> 
            <li><Link to="/adminlistings">Listings</Link></li> 
            <li><Link to="/adminlistings">Categories</Link></li> 
            <li>{category}</li> 
                    
            </ul>
        </div>
        <div className="text-2xl mb-2">{category}</div>
        

        <Link to={`/adminnewlisting/${id}`}>
        <button className="btn btn-wide btn-primary my-2">Create Listing</button>
        </Link>      

        <div className="text-lg mb-2">{count ? `Listings: ${count}` : "Server error"}</div>

        <div className="grid gap-2 grid-cols-1">
            {data && productCards}
            {data?.length===0 && <div>No products</div>}
        </div>
      

    </>
  )
}

export default AdminCategory