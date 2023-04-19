import { useState } from "react";
import { useForm } from "react-hook-form";
import useForgotPassword from "../hooks/useForgotPassword";

const ForgotPassword = () => {
    const [error, setError] = useState("")
    const forgotPassword = useForgotPassword({ setError: setError })

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (formData) => {
        forgotPassword(formData)
    }

    return (
        <>
        <div className="text-2xl mb-6">Forgot Password</div>
        <div className="text my-2">Enter your mobile number</div>
        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)} className="form-control">
        <div className="flex flex-col items-center">

        <label className="input-group flex flex-col items-center my-3">
        {/* register your input into the hook by invoking the "register" function */}
        <input placeholder="Mobile" {...register("mobile", { 
            required: true, pattern: /^[0-9]*$/i, minLength: 8, maxLength: 8, onChange: () => setError("") 
        })} 
            className="input input-bordered border border-black w-full max-w-xs"/>
        </label>       

        
        <div className="my-4">
            
            {errors.mobile?.type === 'pattern' && <span>Mobile number only</span>} 
            {errors.mobile?.type === 'required' && <span>Mobile number is required</span>}
            {errors.mobile?.type === 'minLength' && <span>Mobile number is 8 digits only</span>}
            {errors.mobile?.type === 'maxLength' && <span>Mobile number is 8 digits only</span>}            

        </div>
        <div className="my-1">{error}</div>
        {forgotPassword.isLoading && <div>Checking...</div>} 
        {forgotPassword.isError && <div>{forgotPassword.error}</div>} 

        <button className="btn btn-primary btn-wide" type="submit">Reset Password</button>
        </div>
        </form>       
        </>
    )
}

export default ForgotPassword