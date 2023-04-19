import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { resetPassword } from "../api/user";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import useToastSuccess from "../hooks/useToastSuccess";
import useAuthDetails from "../hooks/useAuthDetails";

const ResetPassword = () => {

  const { mobile, accessToken } = useAuthDetails()
      
  const [ error, setError ] = useState("") 
  const [ password, setPassword ] = useState("")
  const [ confirmPassword, setConfirmPassword ] = useState("")

  const navigate = useNavigate()

  const mutation = useMutation(formData => resetPassword(formData, accessToken), 
    {
      onError: (response) => {
        console.log(response)
      },
      onSuccess: (response) => {

        if (response.status === 200) {

          useToastSuccess('Password updated')        
          setPassword("")
          setConfirmPassword("")
          navigate("/")
        } else {
          setError(response.data.message)
        }
      }
    }
  )
  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = async (formData) => {
    
    const data = {...formData, mobile: mobile.toString()}
    // console.log(data)
    mutation.mutate(data)
    
  }
 
  useEffect(() => {
    setError("")
  }, [password, confirmPassword])

  useEffect(() => {
    if (!accessToken) {
        navigate("/")
    }
  }, [])
  

  return (
    <>
            
    <div className="text-2xl my-2">Reset Password</div>

    {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
    <form onSubmit={handleSubmit(onSubmit)} className="form-control">
      <div className="flex flex-col items-center">

      <label className="input-group flex flex-col items-center my-3">
      {/* register your input into the hook by invoking the "register" function */}
      <input type="password" autoComplete="off" placeholder="New password" value={password} {...register("password", 
        { 
            required: true, minLength: 5, pattern: /^[a-z0-9]+$/i, 
            onChange: (e) => {setPassword(e.target.value); setError("")}
        },)} 
        className="input input-bordered w-full max-w-xs"/>
      </label>

      <label className="input-group flex flex-col items-center my-3">
      {/* register your input into the hook by invoking the "register" function */}
      <input type="password" autoComplete="off" placeholder="Confirm password" value={confirmPassword} {...register("confirmPassword", 
        { 
            validate: value => value === password, onChange: (e) => {setConfirmPassword(e.target.value); setError("")}
        })} 
        className="input input-bordered w-full max-w-xs"/>
      </label>    
     

      <div className="my-4">
        {errors.password?.type === 'required' && <span>New password is required</span>}
        {errors.password?.type === 'minLength' && <span>New password must have an least 5 characters</span>}
        {errors.password?.type === 'pattern' && <span>Password can only have alphanumeric characters</span>}
        
        {Boolean(errors.password) || errors.confirmPassword?.type === 'validate' && <span>Passwords don't match</span>}
             
      </div>

      <div className="my-1">{error}</div>
      {mutation.isLoading && <div>Updating...</div>} 

      <button className="btn btn-primary btn-wide" type="submit">Update</button>
      </div>
    </form>
        
    </>
  );
  
}

export default ResetPassword