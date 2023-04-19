import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UpdateCart = () => {

    const navigate = useNavigate()
    useEffect(() => {navigate("/cart"), {replace: true}}, [])

  return (
    <div>Updating Cart...</div>
  )
}

export default UpdateCart