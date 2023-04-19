import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useQuery } from "react-query";
import { getProductsByCategory } from "../api/product";
import LoadingSpinner from "../components/LoadingSpinner";

const Category = () => {

  const { id } = useParams()

  const { isLoading, isError, data, error } = useQuery(
    ['products', id], () => getProductsByCategory(id))

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  
  const productCards = data?.map(prod => {
    return (
      <ProductCard 
        imgUrl={prod.imgUrl}
        name={prod.name}
        id={prod.id}
        desc={prod.desc}
        price={prod.price}
        listed={prod.listed}
        key={prod.id}
      />
    )
  })

  const category = data?.[0]?.Category?.name

  return (
    
    <>
      <div className="text-sm breadcrumbs">
        <ul>
          <li><Link to="/">Categories</Link></li> 
          <li>{category}</li>          
        </ul>
      </div>
      <div className="grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        {productCards}
        {data?.length===0 && <div>No products</div>}
        {!data && <div className="text-lg">Server error</div>}
      </div>
      

    </>
  )
}

export default Category