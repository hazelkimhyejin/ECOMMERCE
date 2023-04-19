import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const OrderCard = (
    { 
        imgUrl, name, id, price, listed, date, quantity, cancel, fulfil, paid, collect 
    }) => {

        const [ status, setStatus ] = useState("")
        const [ badge, setBadge ] = useState("")
        const statusCheck = (cancel, fulfil, paid, collect) => {
            if (!cancel && !fulfil && !paid && !collect) {
                setStatus("Payment pending")
                setBadge("badge-primary")
            } else if (!cancel && !fulfil && paid && !collect) {
                setStatus("Fulfiling order")
                setBadge("badge-secondary")
            } else if (!cancel && fulfil && paid && !collect) {
                setStatus("Ready for collection")
                setBadge("badge-success")
            } else if (cancel && !fulfil && !paid && !collect) {
                setStatus("Order cancelled")
                setBadge("badge-warning")
            } else if (cancel && !fulfil && paid && !collect) {
                setStatus("Refund pending")
                setBadge("badge-info")
            } else if (!cancel && fulfil && paid && collect) {
                setStatus("Collected")
                setBadge("badge-accent")
            }
        }

        useEffect(() => statusCheck(cancel, fulfil, paid, collect), [])
        const sliceDate = date?.slice(0, 10)
        
  return (
    <>
        <Link to={`/order/${id}`}>
        <div className="card card-side bg-base-100 shadow-xl my-2 p-1">
        <figure><img className="object-contain p-2 h-40" src={imgUrl} alt={name}/></figure>
        <div className="card-body p-1">
            <h2 className="text-xl font-semibold line-clamp-2">{name}</h2>
            <div className="card-actions justify-end flex-col items-end">
            <div className="flex mr-5">
                <div className="text-lg mr-2">Quantity:</div>
                <div className="text-lg font-semibold">{quantity}</div>
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
            
            <div className={`mr-5 badge ${badge}`}>{status}</div>
            <button className="btn btn-primary mr-5">View Details</button>
            </div>
        </div>
        </div>
        </Link>
    </>
  )
}

export default OrderCard