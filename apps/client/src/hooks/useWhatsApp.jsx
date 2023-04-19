import { useMutation } from "react-query";
import useToastSuccess from "./useToastSuccess";
import useAuthDetails from "./useAuthDetails";
import { whatsapp } from "../api/whatsapp";

const useWhatsApp = () => {
    const { accessToken } = useAuthDetails()
    const { mutate } = useMutation(formData => whatsapp(formData, accessToken), 
    {
        onError: (response) => {
            
            console.log(response)
        },
        onSuccess: (response) => {
            
            // console.log(response)
            if (response.status === 201) {
                useToastSuccess("WhatsApp sent")   
            } else useToastError("Error: WhatsApp not sent")
        },
    })
    return mutate
}

export default useWhatsApp