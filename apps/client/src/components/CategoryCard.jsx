import { Link } from "react-router-dom";

const CategoryCard = ({ imgUrl, name, id }) => {
  return (
    <>
        <Link to={`/cat/${id}`}>
        <div className="card card-compact max-w-sm bg-base-100 shadow-xl max-h-60">
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

export default CategoryCard