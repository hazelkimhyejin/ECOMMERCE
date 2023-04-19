import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UpdateOrder = () => {

    const navigate = useNavigate()
    useEffect(() => {

        navigate("/"), {replace: true}
    }, [])

  return (
    <div>Logging Out...</div>
  )
}

export default UpdateOrder