import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getCartByUserId } from "../api/cart";
import CheckoutCard from "../components/CheckoutCard";
import LoadingSpinner from "../components/LoadingSpinner";
import useAuthDetails from "../hooks/useAuthDetails";
import useWhatsApp from "../hooks/useWhatsApp";
import useCreateOrder from "../hooks/useCreateOrder";
import useClearCart from "../hooks/useClearCart";

const Checkout = () => {

    const { id: userId, mobile, accessToken } = useAuthDetails()
    let total = 0
    
    const sendWhatsApp = useWhatsApp()
    const createOrder = useCreateOrder()
    const { mutate: clearCart } = useClearCart()
    
    const { isLoading, isError, data, error } = useQuery(
      ['cart'], () => getCartByUserId(userId, accessToken))
  
    if (isLoading) {
      return <LoadingSpinner />
    }
  
    if (isError) {
      return <span>Error: {error.message}</span>
    }

    // console.log(data)

    data?.map(item => {
      const subtotal = item.quantity * item.Product.price
      total += subtotal
    })

    const checkoutCards = data?.map(item => {
      if (item.Product.listed) {
        return (
          <CheckoutCard
            imgUrl={item.Product.imgUrl}
            name={item.Product.name}
            price={item.Product.price}
            qty={item.quantity}
            productId={item.productId}
            key={item.id}
          />
        )
      }
    })

    const checkout = async (data) => {
      const order = await data.map(item => {
        const formData = {
          "fulfil": "false",
          "cancel": "false",
          "ProductId": item.ProductId,
          "UserId": item.UserId,
          "quantity": item.quantity.toString()
        }
        // console.log(formData)
        try {
          createOrder(formData)
          sendWhatsApp({
            message: `Your order of ${item.quantity} nos of ${item.Product.name} is being processed. Please log in to GroupBuy for payment details.`,
            mobile: mobile
          })    
           
        } catch (error) {
          console.log(error)
        }        
      })
      clearCart(userId)  

    }

    return (
      <>
        <div className="text-sm breadcrumbs">
          <ul>
            <li><Link to="/cart">Cart</Link></li>  
            <li>Checkout</li>          
          </ul>
        </div>  
        <div className="text-2xl mb-2">Checkout</div>
        <button className="btn btn-wide" onClick={() => checkout(data)}>Confirm Checkout</button>
        <div className="flex justify-center my-3">
            <div className="text-xl mr-2 font-semibold">Total:</div>
            <div className="text-xl mr-2">$</div>
            <div className="text-xl font-semibold">{total}</div>
        </div>
        {checkoutCards}     
        {!data && <div className="text-lg">Server error</div>}   
      </>
    )
}

export default Checkout