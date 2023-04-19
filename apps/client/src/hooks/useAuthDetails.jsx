import useGroupBuyStore from "../store/store";

const useAuthDetails = () => {
    const authDetails = useGroupBuyStore((state) => state.authDetails)
    
    return authDetails
}

export default useAuthDetails