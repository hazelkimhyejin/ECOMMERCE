import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import useAuthDetails from "../hooks/useAuthDetails";
import useGroupBuyStore from "../store/store";
import { sendOTP } from "../api/whatsapp";
import { verifyOTP } from "../api/user";

const OTPVerify = () => {
    const [error, setError] = useState("")
    const [OTPSent, setOTPsent] = useState(false)
    const [OTPCount, setOTPCount] = useState(0)
    const { mobile } = useAuthDetails()
    const navigate = useNavigate()
    const setAuthDetails = useGroupBuyStore((state) => state.setAuthDetails)

    const useSendOTP = useMutation((formData) => {
        if (OTPCount <= 3) {
            return sendOTP(formData)
        }        
    }, 
    {
      onError: (response) => {
        
        console.log(response)
      },
      onSuccess: (response) => {
        // console.log(response)
        if (response.status === 201) {            
            document.getElementById("resend").classList.add("btn-disabled")
            setOTPsent(true)  
            setOTPCount(prev => prev + 1)
        } else {
            setError(response.data.message)
        }
      },
    })

    const useVerifyOTP = useMutation(
        (formData) => verifyOTP(formData), 
        {
        onError: (response) => {
            
            console.log(response)
        },
        onSuccess: (response) => {
            // console.log(response)
            if (response?.status === 200) {            
                setError("redirecting...")
                setAuthDetails(response.data)
                navigate("/resetpw")
            } else {
                setError(response?.response?.data?.message)
            }
        },
        })

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (formData) => {
        
        formData = {...formData, mobile: mobile}
        // console.log(formData)
        useVerifyOTP.mutate(formData) 
        
    }
   
    useEffect(() => {
        
        useSendOTP.mutate({mobile: mobile})
        
    }, [])

    useEffect(() => {
        const enable = () => {
            if (OTPCount <= 3) {
                document.getElementById("resend").classList.remove("btn-disabled") 
                setOTPsent(false)    
            }            
        }
        setTimeout(enable, 20000)
        return () => clearTimeout(enable)
    }, [OTPCount])

    useEffect(() => {
        if (OTPCount > 3) {
            document.getElementById("resend").classList.add("btn-disabled") 
        }
    }, [OTPCount])

    return (
        <>
        <div className="text-2xl mb-6">Reset Password</div>
        <div className="text my-2">Enter the OTP sent to your mobile</div>
        <div className="text-sm my-2">For demo purpose: OTP is 998877</div>
        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)} className="form-control">
        <div className="flex flex-col items-center">

        <label className="input-group flex flex-col items-center my-3">
        {/* register your input into the hook by invoking the "register" function */}
        <input autoComplete="false" placeholder="OTP" {...register("otp", { 
            required: true, pattern: /^[0-9]*$/i, minLength: 6, maxLength: 6, onChange: () => setError("") 
        })} 
            className="input input-bordered border border-black w-full max-w-xs"/>
        </label>       

        
        <div className="my-4">
            
            {errors.otp?.type === 'pattern' && <span>Numbers only</span>} 
            {errors.otp?.type === 'required' && <span>OTP is required</span>}
            {errors.otp?.type === 'minLength' && <span>OTP is 6 digits only</span>}
            {errors.otp?.type === 'maxLength' && <span>OTP is 6 digits only</span>}            

        </div>
        <div className="my-1">{error}</div>
        {useVerifyOTP.isLoading && <div>Checking...</div>} 
        {useVerifyOTP.isError && <div>{useVerifyOTP.error}</div>} 

        <button className="btn btn-primary btn-wide" type="submit">Verify</button>
        </div>
        </form> 

        <div>
            <button 
                id="resend" 
                className="btn btn-sm btn-primary btn-wide my-3 btn-disabled"
                onClick={() => useSendOTP.mutate({mobile: mobile})}
            >
                Resend OTP
            </button>
            {OTPCount > 3 && <div className="text-sm my-1">You have exceeded the number of retries.</div>} 
            {OTPSent && OTPCount <= 3 && <div className="text-sm my-1">Resend OTP enabled again after 20 seconds</div>} 
        </div>
             
        </>
    )
}

export default OTPVerify