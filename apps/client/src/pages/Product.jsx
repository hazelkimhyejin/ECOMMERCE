import ProductDetail from "../components/ProductDetail";
import { useParams } from "react-router-dom";
import useGroupBuyStore from "../store/store";
import { useQuery } from "react-query";
import { getProductById } from "../api/product";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const Product = () => {

  const { id } = useParams()
  
  const authDetails = useGroupBuyStore((state) => state.authDetails)
  
  const { isLoading, isError, data, error } = useQuery(
    ['product', id], () => getProductById(id))

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const category = data?.Category?.name
  // console.log(data)
   
  return (
    <>
      <div className="text-sm breadcrumbs">
        <ul>
          <li><Link to="/">Categories</Link></li>  
          <li><Link to={`/cat/${data?.CategoryId}`}>{category}</Link></li>          
        </ul>
      </div>    
      {!data && <div className="text-lg">Server error</div>}
      <ProductDetail 
        imgUrl={data?.imgUrl}
        imgUrl1={data?.imgUrl1}
        imgUrl2={data?.imgUrl2}
        imgUrl3={data?.imgUrl3}
        imgUrl4={data?.imgUrl4}
        name={data?.name}
        productId={data?.id}
        desc={data?.desc}
        price={data?.price}
        listed={data?.listed}
        userId={authDetails.id}
      />

    </>
  )
}

export default Product