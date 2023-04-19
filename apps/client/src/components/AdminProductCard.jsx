import { Link } from "react-router-dom";

const AdminProductCard = (
    { 
        imgUrl, name, productId, price, listed, date, quantity, cancel, fulfil, paid, collect 
    }) => {

        
        const sliceDate = date?.slice(0, 10)
        
  return (
    <>
        
        <div className="card card-side bg-base-100 shadow-xl my-2 p-1">
        <figure>
            <Link to={`/prod/${productId}`}>
            <img className="object-contain p-2 h-40" src={imgUrl} alt={name}/>
            <div className="">View on store</div>
            </Link>
        </figure>
        <div className="card-body p-1">
            <h2 className="text-lg font-semibold line-clamp-2 sm:text-xl sm:text-right sm:mr-10">{name}</h2>
            <div className="sm:flex sm:justify-end">
            <div className="card-actions justify-end flex-col items-end sm:items-center">

                <div className="flex mr-5">
                    <div className="mr-2">Listed on</div>
                    <div className="">{sliceDate}</div>                
                </div>

                <div className="flex mr-5">
                    {listed ? 
                        <div className="badge badge-primary">open for orders</div> : 
                        <div className="badge">listing closed</div>
                    }
                </div>            

                <div className="flex mr-5">
                    <div className="text-lg mr-2">Price:</div>
                    <div className="text-lg">$</div>
                    <div className="text-lg font-semibold">{price}</div>
                </div>            
            
            </div>
                <div className="flex justify-end sm:ml-16">
                    <Link to={`/admin/product/${productId}`}>
                        <button className="btn btn-primary my-2 mx-2">Edit</button>
                    </Link>
                    <Link to={`/admin/orders/${productId}`}>
                        <button className="btn btn-secondary my-2 mx-2">Orders</button>  
                    </Link>    
                </div>
            </div>
        </div>
        </div>
        
    </>
  )
}

export default AdminProductCard