import { useMutation } from "react-query";
import { createOrder } from "../api/order";

const useCreateOrder = () => {
    const { mutate } = useMutation(formData => createOrder(formData), 
    {
      onError: (response) => {
        console.log(response)
      },
      onSuccess: (response) => {
        // console.log(response)
        if (response.status === 201) {
          // useToastSuccess("Order completed")
                      
        } else {
          // useToastError("Error: Cannot checkout")
        }
      },
    })
    return mutate
}

export default useCreateOrder