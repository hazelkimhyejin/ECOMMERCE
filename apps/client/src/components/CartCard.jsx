import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateCart, deleteCartById } from "../api/cart";
import { useMutation, useQueryClient } from "react-query";
import useToastError from "../hooks/useToastError";
import useToastSuccess from "../hooks/useToastSuccess";
import useAuthDetails from "../hooks/useAuthDetails";

const CartCard = (
    { 
        imgUrl, name, productId, price, listed, quantity, cartId
    }) => {

    const [ qty, setQty ] = useState(quantity)    
    const addQty = () => setQty(qty + 1)
    const minusQty = () => {
      if (qty>1) {
        setQty(qty - 1)
      }
    }

    const queryClient = useQueryClient()
    const { accessToken, id } = useAuthDetails()

    const mutation = useMutation(formData => updateCart(formData, accessToken), 
    {
      onError: (response) => {
        console.log(response)
      },
      onSuccess: (response) => {
        // console.log(response)
        
        if (response.status !== 200) {          
            useToastError("Error: Cart not updated")                      
        } 
        queryClient.invalidateQueries('cart')
        // queryClient.invalidateQueries('countCart')
      },
    })

    const deleteMutation = useMutation(formData => deleteCartById(formData, accessToken), 
    {
      onError: (response) => {
        console.log(response)
      },
      onSuccess: (response) => {
        // console.log(response)
        if (response.status !== 200) {
          
          useToastError("Error: Cart not updated")
                      
        } else {
          useToastSuccess("Cart updated")
          queryClient.invalidateQueries('cart')
          queryClient.invalidateQueries('countCart')
        }
      },
    })
    

    useEffect(() => {
        if (qty >= 1) {
          mutation.mutate(JSON.stringify({id: cartId, quantity: qty}))
        }        
    }, [qty])

                
  return (
    <>
        
        <div className="card card-side bg-base-100 shadow-xl my-2 p-1">

        <Link to={`/prod/${productId}`}>
        <figure><img className="object-contain p-2 h-40" src={imgUrl} alt={name}/></figure>
        </Link>

        <div className="card-body p-1">
            <h2 className="text-xl font-semibold line-clamp-2">{name}</h2>
            <div className="card-actions justify-end flex-col items-end">
            
            <div className="flex mr-5 items-center">
                <div className="text-lg mr-2">Total:</div>
                <div className="text-lg">$</div>
                <div className="text-xl font-semibold mr-2">{qty * price}</div>
                {
                  listed ? 
                  <div className="badge badge-primary">available</div> : 
                  <div className="badge">closed</div>
                }
            </div>

            <div className="btn-group my-2">
              <button className="btn w-16" onClick={minusQty}>-</button>
              <div className="btn btn-outline text-lg">{qty}</div>
              <button className="btn w-16" onClick={addQty}>+</button>
            </div>

            <button className="btn w-20 btn-accent btn-sm" 
              onClick={() => deleteMutation.mutate(cartId)}>Remove</button>

            </div>
        </div>
        </div>
        
    </>
  )
}

export default CartCard