import { useMutation } from "react-query";
import { forgotPassword } from "../api/user";
import useGroupBuyStore from "../store/store";
import { useNavigate } from "react-router-dom";

const useForgotPassword = ({ setError }) => {
    const navigate = useNavigate()
    const setAuthDetails = useGroupBuyStore((state) => state.setAuthDetails)
    const { mutate } = useMutation(formData => forgotPassword(formData), 
    {
      onError: (response) => {
        
        console.log(response)
      },
      onSuccess: (response) => {
        // console.log(response)
        if (response.status === 200) {
            setAuthDetails(response.data)
            navigate("/otpverify", { replace: true })
        } else {
            setError(response.data.message)
        }
      },
    })
    return mutate
}

export default useForgotPassword