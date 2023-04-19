import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getOrderByIdAdmin } from "../api/order";
import AdminOrderCard from "../components/AdminOrderCard";
import LoadingSpinner from "../components/LoadingSpinner";
import OrderCrm from "../components/crm/OrderCrm";
import useAuthDetails from "../hooks/useAuthDetails";

const AdminUpdateOrder = () => {
    const { id } = useParams()
    const { accessToken } = useAuthDetails()
    
    const { isLoading, isError, data, error } = useQuery(
        ['orderAdmin', id], () => getOrderByIdAdmin(id, accessToken))
    // console.log(data?)    

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
              <li><Link to={`/admin/cat/${data?.category.id}`}>{data?.category.name}</Link></li> 
              <li>{data?.product.Product.name}</li>  
              <li><Link to={`/admin/orders/${data?.product.Product.id}`}>Orders</Link></li>  
              <li>Update Order</li>   
              </ul>
            </div>


            <div className="text-2xl mb-2">Update Order</div>
            <div className="mb-2">Order id: {id}</div>
            {data?.product.Product.id || <div className="text-lg">"Server error"</div>}
            <AdminOrderCard
                imgUrl={data?.product.Product.imgUrl}
                name={data?.product.Product.name}
                id={data?.product.ProductId}
                price={data?.product.Product.price}
                date={data?.product.createdAt}
                quantity={data?.product.quantity}
                cancel={data?.product.cancel}
                fulfil={data?.product.fulfil}
                paid={data?.product.paid}
                collect={data?.product.collect}
                buyerName={data?.user.User.name}
                mobile={data?.user.User.mobile}
            />
            
            <OrderCrm 
                id={id} 
                buyerName={data?.user.User.name}
                price={data?.product.Product.price}
                quantity={data?.product.quantity}
                name={data?.product.Product.name}
                mobile={data?.user.User.mobile}
            />

            
            
        </>
        
    )
}

export default AdminUpdateOrder