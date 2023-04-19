import { Link } from "react-router-dom";

const CheckoutCard = (
    { 
        imgUrl, name, productId, price, qty 
    }) => {

                    
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
                    <div className="text-lg mr-2">Price:</div>
                    <div className="text-lg">$</div>
                    <div className="text-xl font-semibold mr-2">{price}</div>                    
                    <div className="text-lg mr-2">Qty:</div>
                    <div className="text-xl font-semibold mr-2">{qty}</div>                    
                </div>
                <div className="flex mr-5 items-center">
                    <div className="text-lg mr-2">Total:</div>
                    <div className="text-lg">$</div>
                    <div className="text-xl font-semibold mr-2">{qty * price}</div>                    
                </div>

                </div>
            </div>
            </div>
            
        </>
    )
}

export default CheckoutCard