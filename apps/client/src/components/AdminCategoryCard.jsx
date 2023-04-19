import { Link } from "react-router-dom";

const AdminCategoryCard = ({ imgUrl, name, catId }) => {
  return (
    <>
        <Link to={`/admin/cat/${catId}`}>
        <div className="card card-compact max-w-sm bg-base-100 shadow-xl max-h-60 my-2">
            <figure><img className="object-contain h-40 p-2" src={imgUrl} alt={name} /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                
                <div className="card-actions justify-end">
                
                </div>
            </div>
        </div>
        </Link>
    </>
  )
}

export default AdminCategoryCard