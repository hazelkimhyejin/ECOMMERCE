import { useMutation, useQueryClient } from "react-query";
import { clearCartByUserId } from "../api/cart";
import useToastSuccess from "./useToastSuccess";
import useToastError from "./useToastError";
import { useNavigate } from "react-router-dom";
import useAuthDetails from "./useAuthDetails";
import { useState } from "react";

const useClearCart = () => {
    const [ success, setSuccess ] = useState(false)
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { accessToken } = useAuthDetails()
    const { mutate } = useMutation(formData => clearCartByUserId(formData, accessToken), 
    {
      onError: (response) => {
        console.log(response)
      },
      onSuccess: (response) => {
        // console.log(response)
        if (response?.status === 200) {          
          useToastSuccess("Checkout complete")  
          queryClient.invalidateQueries('countCart') 
          queryClient.invalidateQueries('orders')
          navigate("/updateorder")     
          setSuccess(true)              
        } else if (response?.status === 204) {
          useToastError("Error: Cannot clear cart")
        } else {
          useToastError("Error: Cannot checkout")
        }
      },
    })
    return { mutate, success }
}

export default useClearCart