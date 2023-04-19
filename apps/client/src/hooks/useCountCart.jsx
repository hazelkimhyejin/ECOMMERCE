import { countCartByUserId } from "../api/cart";
import { useQuery } from "react-query"
import useAuthDetails from "./useAuthDetails";

const useCountCart = () => {
    
    const { id, accessToken } = useAuthDetails()
    
    const { isLoading, isError, data, error } = useQuery(
        ['countCart'], () => countCartByUserId(id, accessToken))
    
    return { isLoading, isError, data, error }
}

export default useCountCart