import { toast } from "react-toastify";

const useToastError = (message) => {
    return (
        toast.error(message, {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            })
    )
}

export default useToastError