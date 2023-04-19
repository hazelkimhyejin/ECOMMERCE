import { toast } from "react-toastify";

const useToastSuccess = (message) => {
    return (
        toast.success(message, {
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

export default useToastSuccess