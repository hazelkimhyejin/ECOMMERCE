import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UpdateOrder = () => {

    const navigate = useNavigate()
    useEffect(() => {navigate("/orders"), {replace: true}}, [])

  return (
    <div>Updating Orders...</div>
  )
}

export default UpdateOrder