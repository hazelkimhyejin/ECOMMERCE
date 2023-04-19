import { toast } from "react-toastify";

const useToastDefault = (message) => {
    return (
        toast(message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            })
    )
}

export default useToastDefault