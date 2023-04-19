import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const OrderDetail = (
    { 
        imgUrl, name, id, price, listed, date, quantity, 
        cancel, fulfil, paid, collect, update, orderId 
    }) => {

        const [ status, setStatus ] = useState("")
        const [ badge, setBadge ] = useState("")
        const [ message, setMessage ] = useState("")
        const shortOrderId = orderId?.slice(-6)
        const sliceUpdate = update?.slice(0, 10)
        const sliceDate = date?.slice(0, 10)

        const statusCheck = (cancel, fulfil, paid, collect) => {
            if (!cancel && !fulfil && !paid && !collect) {
                setStatus("Payment pending")
                setBadge("badge-primary")
                setMessage(`Please pay $${price * quantity} by Paynow to 95551234 using your registered mobile and with the comment '${shortOrderId}'. Thank you!`)
            } else if (!cancel && !fulfil && paid && !collect) {
                setStatus("Fulfiling order")
                setBadge("badge-secondary")
                setMessage(`We have received you payment and will inform you when the order is ready for collection.`)
            } else if (!cancel && fulfil && paid && !collect) {
                setStatus("Ready for collection")
                setBadge("badge-success")
                setMessage(`Your order is ready for collection!`)
            } else if (cancel && !fulfil && !paid && !collect) {
                setStatus("Order cancelled")
                setBadge("badge-warning")
                setMessage(`You have cancelled the order on ${sliceUpdate}.`)
            } else if (cancel && !fulfil && paid && !collect) {
                setStatus("Refund pending")
                setBadge("badge-info")
                setMessage("We are processing your refund.")
            } else if (!cancel && fulfil && paid && collect) {
                setStatus("Collected")
                setBadge("badge-accent")
                setMessage(`You collected this order on ${sliceUpdate}.`)
            }
        }

        useEffect(() => statusCheck(cancel, fulfil, paid, collect), [])
        
        
  return (
    <>
        
        <div className="card card-side bg-base-100 shadow-xl my-2 p-1">
        <Link to={`/prod/${id}`}>
        <figure><img className="object-contain p-2 h-40" src={imgUrl} alt={name}/></figure>
        </Link>
        <div className="card-body p-1">
            <h2 className="text-xl font-semibold line-clamp-2">{name}</h2>
            <div className="card-actions justify-end flex-col items-end">
            <div className="flex mr-5">
                <div className="text-lg mr-2">Quantity:</div>
                <div className="text-lg font-semibold">{quantity}</div>
            </div>
            <div className="flex mr-5">
                <div className="text-lg mr-2">Unit price:</div>
                <div className="text-lg">$</div>
                <div className="text-xl font-semibold">{price}</div>
            </div>
            <div className="flex mr-5">
                <div className="text-lg mr-2">Total:</div>
                <div className="text-lg">$</div>
                <div className="text-xl font-semibold">{quantity * price}</div>
            </div>
            
            <div className="flex mr-5">
                <div className="mr-2">Ordered on</div>
                <div className="">{sliceDate}</div>
            </div>
            
            <div className={`mr-5 text-lg badge ${badge}`}>{status}</div>
            
            </div>
        </div>        
        </div>
        <div className="flex flex-col">
            <div className="ml-2 my-2">
                Order Id: {orderId}
            </div>
            <div className="text-lg ml-2 my-2 text-left">
                {message}
            </div>
            <div className="text-sm ml-2 my-2 text-left">
                last updated: {sliceUpdate}
            </div>
        </div>
        
    </>
  )
}

export default OrderDetail