import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { updatePassword } from "../api/user";
import { useMutation } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import useToastSuccess from "../hooks/useToastSuccess";
import useAuthDetails from "../hooks/useAuthDetails";

const UpdatePassword = () => {

  const authDetails = useAuthDetails()
  const [ mobile ] = useState(authDetails.mobile.toString())
      
  const [ error, setError ] = useState("") 
  const [ currentPassword, setCurrentPassword ] = useState("")
  const [ newPassword, setNewPassword ] = useState("")

  const navigate = useNavigate()

  const mutation = useMutation(formData => updatePassword(formData), 
    {
      onError: (response) => {
        console.log(response)
      },
      onSuccess: (response) => {

        if (response.status === 200) {

          useToastSuccess('Password updated')        
          setCurrentPassword("")
          setNewPassword("")
          navigate("/account")
        } else {
          setError(response.data.message)
        }
      }
    }
  )
  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = async (formData) => {
    
    const data = {...formData, mobile: mobile}
    // console.log(data)
    mutation.mutate(data)
    
  }
 
  useEffect(() => {
    setError("")
  }, [currentPassword, newPassword])
  

  return (
    <>
    <div className="text-sm breadcrumbs">
      <ul>
        <li><Link to="/account">Account</Link></li> 
        <li>Update Password</li>        
      </ul>
    </div> 
        
    <div className="text-2xl mb-2">Update Password</div>

    {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
    <form onSubmit={handleSubmit(onSubmit)} className="form-control">
      <div className="flex flex-col items-center">

      <label className="input-group flex flex-col items-center my-3">
      {/* register your input into the hook by invoking the "register" function */}
      <input type="password" autoComplete="off" placeholder="Current password" value={currentPassword} {...register("oldPassword", 
        { required: true, onChange: (e) => setCurrentPassword(e.target.value) },)} 
        className="input input-bordered w-full max-w-xs"/>
      </label>

      <label className="input-group flex flex-col items-center my-3">
      {/* register your input into the hook by invoking the "register" function */}
      <input type="password" autoComplete="off" placeholder="New password" value={newPassword} {...register("password", 
        { required: true, onChange: (e) => setNewPassword(e.target.value), minLength: 5, pattern: /^[a-z0-9]+$/i })} 
        className="input input-bordered w-full max-w-xs"/>
      </label>    
     

      <div className="my-4">
        {errors.oldPassword?.type === 'required' && <span>Current password is required</span>}
        
        {Boolean(errors.oldPassword) || errors.password?.type === 'required' && <span>New password is required</span>}
        {Boolean(errors.oldPassword) || errors.password?.type === 'minLength' && <span>Password must have an least 5 characters</span>}
        {Boolean(errors.oldPassword) || errors.password?.type === 'pattern' && <span>Password can only have alphanumeric characters</span>}
             
      </div>

      <div className="my-1">{error}</div>
      {mutation.isLoading && <div>Updating...</div>} 

      <button className="btn btn-primary btn-wide" type="submit">Update</button>
      </div>
    </form>
        
    </>
  );
  
}

export default UpdatePassword