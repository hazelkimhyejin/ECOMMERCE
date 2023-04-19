import useGroupBuyStore from "../store/store";
import { login } from "../api/user";
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const useLogin = ({ setError }) => {
    const queryClient = useQueryClient()
    const [ success, setSuccess ] = useState(null)
    const setAuthDetails = useGroupBuyStore((state) => state.setAuthDetails)
    const navigate = useNavigate();
    const { mutate } = useMutation(formData => login(formData), 
    {
      onError: (response) => {        
        console.log(response)
        setSuccess(false)
      },
      onSuccess: (response) => {
        // console.log(response)
        if (response.status === 200) {
          queryClient.removeQueries('countCart')
          setAuthDetails(response.data);
          navigate("/", {replace: true})
          setSuccess(true)
        } else {
          setError(response.data.message)
          setSuccess(false)
        }
      },
    })
    return { mutate, success }
}

export default useLogin