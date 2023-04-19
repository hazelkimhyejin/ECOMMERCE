import useGroupBuyStore from "../store/store";

const useUserId = () => {
    const authDetails = useGroupBuyStore((state) => state.authDetails)
    const id = authDetails.id

    return id
}

export default useUserId